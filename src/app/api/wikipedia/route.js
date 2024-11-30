import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

export async function POST(req) {
  try {
    const body = await req.text();
    console.log("Request body:", body);

    if (!body) {
      throw new Error("Request body is empty");
    }

    const { query } = JSON.parse(body);
    console.log("Query received:", query);

    if (!query) {
      throw new Error("No query provided");
    }

    const wikipediaTool = new WikipediaQueryRun({
      topKResults: 3,
      maxDocContentLength: 30000,
    });

    async function getWikipediaContext(searchQuery) {
      try {
        const result = await wikipediaTool.invoke(searchQuery);

        return result;
      } catch (error) {
        console.error("Wikipedia search failed:", error);
        return "";
      }
    }

    // Get Wikipedia context
    const wikiResult = await getWikipediaContext(query);

    return new Response(
      JSON.stringify({
        success: true,
        context: wikiResult,
        query: query,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
