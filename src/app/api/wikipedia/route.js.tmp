import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

export async function POST(req) {
  try {
    const body = await req.text();
    console.log('Request body:', body);

    if (!body) {
      throw new Error('Request body is empty');
    }

    const { query } = JSON.parse(body);
    console.log('Query received:', query);

    const toolWikipediaQueryRun = new WikipediaQueryRun({
      topKResults: 3,
      maxDocContentLength: 4000,
    });

    // Inspect the toolWikipediaQueryRun object
    console.log('WikipediaQueryRun methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(toolWikipediaQueryRun)));
    console.log('WikipediaQueryRun properties:', Object.keys(toolWikipediaQueryRun));

    let results;
    if (typeof toolWikipediaQueryRun.run === 'function') {
      results = await toolWikipediaQueryRun.run(query);
    } else if (typeof toolWikipediaQueryRun.call === 'function') {
      results = await toolWikipediaQueryRun.call(query);
    } else {
      throw new Error('Neither run nor call method found on WikipediaQueryRun object');
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}