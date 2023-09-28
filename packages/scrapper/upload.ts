import fs from "fs";
import { getHeadlineNewsTextContents } from "./scrap";

const resultFilename = process.argv[2]; // Get the filename from the command line argument

(async () => {
  const result = await getHeadlineNewsTextContents();
  fs.writeFileSync(resultFilename, JSON.stringify(result));
})();
