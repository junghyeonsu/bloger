import "dotenv/config";

import fs from "fs";
// import dedent from "dedent";
import { scrapNaverEconomyHeadlineNews } from "@bloger/scrapper";
// import type { HeadlineNewsContent } from "@bloger/scrapper";
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

function getCurrentKoreaDate() {
  const today = new Date();

  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  return `${dateString} ${dayName}`;
}

function getCurrentStringDate() {
  const today = new Date();
  const year = today.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const month = today.toLocaleDateString("en-US", {
    month: "2-digit",
  });
  const day = today.toLocaleDateString("en-US", {
    day: "2-digit",
  });

  return `${year}${month}${day}`;
}

async function main() {
  /* 스크랩 */
  const naverEconomyHeadlineNews = await scrapNaverEconomyHeadlineNews();

  const naverEconomyHeadlineNewsWithSummary = await Promise.all(
    naverEconomyHeadlineNews.map(async (news) => {
      const { title, link, corp, content, summary } = news;

      // const summarizedContent = await Summarizer.summarizeNews({ content });

      // return { title, link, corp, content, summary, summarizedContent };
      return { title, link, corp, content, summary };
    }),
  );

  const content = {
    slug: getCurrentStringDate(),
    date: getCurrentKoreaDate(),
    naverEconomyHeadlineNews: naverEconomyHeadlineNewsWithSummary,
  };

  // TODO: 파일 저장 위치 동적으로 변경하기

  if (!fs.existsSync("../../content")) {
    fs.mkdirSync("../../content");
  }

  if (!fs.existsSync(`../../content/d${resultFilename}`)) {
    fs.mkdirSync(`../../content/d${resultFilename}`);
  }

  fs.writeFileSync(`../../content/d${resultFilename}/news.json`, `${JSON.stringify(content, null, 2)}\n`);
  console.log("스크랩 및 요약 완료");

  /* 요약 */
  // const summaries = await Promise.all(naverEconomyHeadlineNews.map(generateSummaryTemplate));
  // const summarizedContent = dedent`
  //   ${new Date().toLocaleString()} 기준 네이버 경제 뉴스 요약본입니다.

  //   ${summaries.map((summary) => JSON.stringify(summary)).join("\n\n")}\n
  // `;

  // TODO: 파일 저장 위치 동적으로 변경하기
  // fs.writeFileSync(`../../content/${resultFilename}/content.md`, summarizedContent);
  // console.log("요약 완료");

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
