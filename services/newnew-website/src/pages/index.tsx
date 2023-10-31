import { Header } from "@/components/header";
import { Link, graphql, type HeadFC, type PageProps } from "gatsby";
import * as React from "react";

import { Card, CardTitle } from "@/components/ui/card";

export const query = graphql`
  query IndexPage {
    allNews: allNewsJson {
      nodes {
        date
        slug
      }
    }
  }
`;

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  return (
    <>
      <Header />
      <main className="md:flex bg-slate-100">
        <p className="p-4 font-bold text-xl">내가 경제 공부하려고 만든 사이트</p>
        <div className="flex-col">
          {data.allNews.nodes.map((node) => (
            <Link key={node.slug} to={`/news/${node.slug}`}>
              <Card className="m-3 p-3">
                <CardTitle>{node.date}</CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>뉴뉴</title>;
