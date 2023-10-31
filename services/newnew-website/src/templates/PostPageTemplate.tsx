import { Header } from "@/components/header";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const query = graphql`
  query PostPage($id: String!) {
    news: newsJson(id: { eq: $id }) {
      date
      naverEconomyHeadlineNews {
        title
        summary
        link
        corp
        content
      }
    }
  }
`;

interface PostTemplateProps {
  data: Queries.PostPageQuery;
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => {
  return (
    <>
      <Header />
      <main>
        <Card className="break-words">
          <CardTitle className="p-4 font-bold text-3xl">{data?.news?.date} 네이버 경제 헤드라인 뉴스</CardTitle>
          {data?.news?.naverEconomyHeadlineNews?.map((node) => (
            <CardContent key={node?.title} className="p-4">
              <div className="text-xl font-bold">
                {node?.title} - {node?.corp}
              </div>
              <div>{node?.summary}</div>
              {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
              <a href={node?.link!}>뉴스 보러가기</a>
            </CardContent>
          ))}
        </Card>
      </main>
    </>
  );
};

export const Head: HeadFC = ({ data }) => {
  const title = "뉴뉴";

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Facebook Meta Tags */}
      {/* <meta property="og:url" content={`${DOMAIN}/posts/${data.post?.frontmatter?.slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getSrc(ogimage)} />
      <meta property="og:locale" content={metaLocale} /> */}

      {/*  Twitter Meta Tags  */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="junghyeonsu.com" />
      <meta property="twitter:url" content={`${DOMAIN}/posts/${data.post?.frontmatter?.slug}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={getSrc(ogimage)}></meta>
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content={`${devCategory} | ${data.post?.frontmatter?.tags![0]}`} />
      <meta
        name="article:published_time"
        content={`${data.post?.frontmatter?.createdAt?.replace(/[/]/g, "-")}T09:00:00.000Z`}
      /> */}
    </>
  );
};
export default PostTemplate;
