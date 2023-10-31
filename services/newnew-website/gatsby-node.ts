import * as path from "path";

import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  });
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      allNewsJson {
        nodes {
          slug
          id
        }
      }
    }
  `);

  console.log("result", JSON.stringify(result, null, 2));

  const postPageTemplate = path.resolve(__dirname, "src/templates/PostPageTemplate.tsx");

  // 모든 포스트 페이지 생성
  result?.data?.allNewsJson.nodes.forEach((node) => {
    const path = `/news/${node.slug}`;

    createPage({
      path,
      component: postPageTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
