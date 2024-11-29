const GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Search query is required" 
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(q)}&num=10`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Google API error: ${data.error?.message || 'Unknown error'}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        results: data
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch search results'
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}