import "dotenv/config";

import fs from "fs";
import dedent from "dedent";
import { scrapNaverEconomyHeadlineNews } from "@bloger/scrapper";
import type { HeadlineNewsContent } from "@bloger/scrapper";
// import { SummarizeClient } from "@bloger/summarizer";
// import { TistoryClient } from "@bloger/tistory";

const resultFilename = process.argv[2]; // Get the filename from the command line argument

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined");
}

// const Summarizer = new SummarizeClient({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const Tistory = new TistoryClient({
//   apiKey: "",
// });

const generateSummaryTemplate = async (news: HeadlineNewsContent): Promise<string> => {
  const { title, link, corp, content, summary } = news;

  // TODO: 잠시 요약 기능을 끕니다.
  // const summarizedContent = await Summarizer.summarizeNews({ content });

  return dedent(`
    ${title} - ${corp}${summary ? `\n✔ ${summary}` : ""}
    
    ${content}
    ${link ? `- 뉴스 원본 보러가기: ${link}` : ""}
  `);
};

async function main() {
  /* 스크랩 */
  const naverEconomyHeadlineNews = await scrapNaverEconomyHeadlineNews();

  const content = {
    naverEconomyHeadlineNews,
  };

  // TODO: 파일 저장 위치 동적으로 변경하기

  if (!fs.existsSync("../../content")) {
    fs.mkdirSync("../../content");
  }

  if (!fs.existsSync(`../../content/${resultFilename}`)) {
    fs.mkdirSync(`../../content/${resultFilename}`);
  }

  fs.writeFileSync(`../../content/${resultFilename}/data.json`, `${JSON.stringify(content, null, 2)}\n`);
  console.log("스크랩 완료");

  /* 요약 */
  const summaries = await Promise.all(naverEconomyHeadlineNews.map(generateSummaryTemplate));
  const summarizedContent = dedent`
    ${new Date().toLocaleString()} 기준 네이버 경제 뉴스 요약본입니다.

    ${summaries.map((summary) => JSON.stringify(summary)).join("\n\n")}\n
  `;

  // TODO: 파일 저장 위치 동적으로 변경하기
  fs.writeFileSync(`../../content/${resultFilename}/content.md`, summarizedContent);
  console.log("요약 완료");

  /* 업로드 */
  // await Tistory.upload({
  //   blogName: "bloger",
  //   title: "네이버 경제 뉴스 요약본",
  //   content: summarizedContent,
  //   visibility: 0,
  //   category: 0,
  //   published: new Date().getTime(),
  //   slogan: "",
  //   tag: "네이버, 경제, 뉴스, 요약",
  //   acceptComment: 1,
  //   password: "",
  // });
  // console.log("업로드 완료");
}

main();
