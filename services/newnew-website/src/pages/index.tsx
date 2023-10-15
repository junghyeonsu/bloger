import { Header } from "@/components/header";
import { Link, graphql, type HeadFC, type PageProps } from "gatsby";
import * as React from "react";

import { Card, CardTitle } from "@/components/ui/card";

export const query = graphql`
  query IndexPage {
    allPosts: allMdx {
      nodes {
        id
      }
    }
  }
`;

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  return (
    <>
      <Header />
      <main className="md:flex bg-slate-100">
        <div className="flex-col">
          {data.allPosts.nodes.map((node) => (
            <Link key={node.id} to={`/posts/${node.id}`}>
              <Card className="m-3 p-3">
                <CardTitle>Post {node.id}</CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
