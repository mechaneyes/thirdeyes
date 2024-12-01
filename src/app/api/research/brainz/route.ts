const USER_AGENT = "Thirdeyes/1.0.0 ( ray@mechaneyes.com )";

const delayedFetch = async (url: string, delay: number = 1000): Promise<Response> => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });
};

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const artistName = url.searchParams.get("artistName");

    if (!artistName) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Artist name is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Artist search
    const artistResponse = await delayedFetch(
      `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`
    );
    const artistData = await artistResponse.json();

    if (!artistData.artists || artistData.artists.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Artist not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const artistId = artistData.artists[0].id;

    const discographyResponse = await delayedFetch(
      `https://musicbrainz.org/ws/2/artist/${artistId}/releases?inc=aliases+releases&fmt=json`
    );
    const discographyData = await discographyResponse.json();

    const releases = discographyData.releases.map((release: { title: string; id: string }) => ({
      title: release.title,
      id: release.id,
    }));

    const releaseDetails = await Promise.all(
      releases.map(async (release, index) => {
        const response = await delayedFetch(
          `https://musicbrainz.org/ws/2/release/${release.id}?inc=artist-credits+labels+discids+recordings&fmt=json`,
          (index + 1) * 1000
        );
        const data = await response.json();
        return {
          ...release,
          id: data.id,
          title: data.title,
          date: data.date,
          format: data.media?.[0]?.format,
          tracks: data.media?.[0]?.tracks?.map((track: any) => ({
            title: track.title,
            number: track.number,
          })) || [],
        };
      })
    );

    // Sort by date
    const sortedReleases = releaseDetails.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return new Response(
      JSON.stringify({
        success: true,
        releases: sortedReleases,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}