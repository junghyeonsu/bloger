import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="md:flex bg-slate-100">
      hello
      <Button variant="outline" size="lg">
        ddkdk
      </Button>
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">You agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
