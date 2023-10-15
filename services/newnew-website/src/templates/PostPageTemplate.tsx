import { Header } from "@/components/header";
import type { HeadFC } from "gatsby";
import { graphql } from "gatsby";
import React from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const query = graphql`
  query PostPage($id: String!) {
    post: mdx(id: { eq: $id }) {
      body
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
        <Card>
          <CardTitle className="p-4 font-bold text-xl">Post</CardTitle>
          <CardContent className="p-4">{data.post?.body}</CardContent>
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
