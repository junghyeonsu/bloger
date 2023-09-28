import puppeteer from "puppeteer";

const NAVER_NEWS_URL = "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101";

interface HeadlineNewsContent {
  title: string;
  link?: string;
  corp: string;
  content: string;
  summary?: string;
}

export const getHeadlineNewsTextContents = async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  // 페이지 오픈
  const page = await browser.newPage();
  await page.goto(NAVER_NEWS_URL);
  await page.setViewport({ width: 1080, height: 1024 });

  // 더보기 버튼 클릭
  const moreHeadlineSelector = ".cluster_more_inner";
  await page.waitForSelector(moreHeadlineSelector);
  await page.click(moreHeadlineSelector);

  // 헤드라인 뉴스 텍스트 컨테이너 가져오기
  const headlineNewsTextContainerSelector = ".sh_text";
  const headlineNewsTextContainers = await page.$$(headlineNewsTextContainerSelector);
  const headlineNewsContents = await Promise.all(
    headlineNewsTextContainers.map(async (headlineNewsTextContainer) => {
      const title = await headlineNewsTextContainer.$eval("a", (a) => a.textContent);
      const link = await headlineNewsTextContainer.$eval("a", (a) => a.getAttribute("href"));
      const corp = await headlineNewsTextContainer.$eval(".sh_text_info > div", (div) => div.textContent);

      if (!link) return { title, link: undefined, corp };

      // 뉴스 페이지 오픈
      const newsPage = await browser.newPage();
      await newsPage.goto(link);

      // 뉴스 본문 가져오기
      const article = await newsPage.$("#dic_area");
      const content = await article?.evaluate((node) => node.textContent);
      const cleanContent = content?.replace(/\n/g, " ").replace(/\t/g, " ").replace(/\s\s+/g, " ").trim();

      // 뉴스 요약 가져오기
      const summarySelector = await newsPage.$(".media_end_summary");
      if (!summarySelector) {
        await newsPage.close();
        return { title, link, corp, content: cleanContent, summary: undefined };
      }

      // 뉴스 요약이 있는 경우
      const summaryContent = await summarySelector.evaluate((node) => node.textContent);
      await newsPage.close();

      return { title, link, corp, content: cleanContent, summary: summaryContent };
    }),
  );

  await browser.close();

  return { headlineNewsContents: headlineNewsContents as HeadlineNewsContent[] };
};
