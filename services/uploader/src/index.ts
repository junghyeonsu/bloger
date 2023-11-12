import "dotenv/config";

import fs from "fs";
import { html } from "common-tags";
import { scrapNaverEconomyHeadlineNews } from "@bloger/scrapper";
import { TistoryClient } from "@bloger/tistory-client";

const resultFilename = process.argv[2]; // Get the filename from the command line argument

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined");
}

const Tistory = new TistoryClient({
  access_token: process.env.TISTORY_ACCESS_TOKEN,
  blog_name: "evenew",
});

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
      const { title, link, corp, content, summary, aiSummary } = news;
      return { title, link, corp, content, summary, aiSummary };
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
  const summarizedContent = html`
    <div>
      <h2>${content.date} 네이버 경제 뉴스 요약본입니다.</h2>
      
      <div>
        ${naverEconomyHeadlineNewsWithSummary
          .map((news, index) => {
            const { title, link, corp, summary, aiSummary } = news;

            if (aiSummary) {
              return html`
              <div>
                <h3>${index + 1}.${title}</h3>
                <p>${aiSummary}</p>
                <br />
                <p href="${link}" _target="blank">뉴스 원본 보러가기 (${corp})</p>
              </div>
            `;
            }

            return html`
            <div>
              <h3>${index + 1}.${title}</h3>
              <p>${summary}</p>
              <br />
              <p href="${link}" _target="blank">뉴스 원본 보러가기 (${corp})</p>
            </div>
          `;
          })
          .join(html`<br /><br /><br />`)}
      </div>
    </div>
  `;

  /* 업로드 */
  const tistoryResult = await Tistory.postWrite({
    title: `${content.date} 경제 뉴스 요약`,
    content: summarizedContent,
    visibility: 0,

    output: "json",

    // 매일매일뉴스뉴스
    category: 1170104,
  });

  console.log("tistoryResult", tistoryResult);
}

main();
