import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

export const toolWikipediaQueryRun = new WikipediaQueryRun({
  topKResults: 3,
  maxDocContentLength: 4000,
});