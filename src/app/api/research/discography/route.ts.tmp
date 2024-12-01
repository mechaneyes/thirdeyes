const USER_AGENT = "Thirdeyes/1.0.0 ( ray@mechaneyes.com )";

export async function GET(req: Request) {
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
    const artistResponse = await fetch(
      `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(
        artistName
      )}&fmt=json`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
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
    console.log("artistId", artistId);

    // 🍄 🍄 🍄 🍄
    // 🍄 🍄 🍄 🍄
    // 🍄 🍄 🍄 🍄
    const artistReleases = await fetch(
      `https://musicbrainz.org/ws/2/artist/${artistId}?inc=aliases+releases&fmt=json`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    );
    const artistReleasesData = await artistReleases.json();
    // console.log("artistReleasesData", artistReleasesData);

    // Fetch discography
    // const disgographyResponse = await fetch(
    //   `https://musicbrainz.org/ws/2/release?artist=${artistId}&fmt=json`,
    //   {
    //     headers: {
    //       "User-Agent": USER_AGENT,
    //     },
    //   }
    // );
    // const disgographyData = await disgographyResponse.json();

    const discography = artistReleasesData.releases.map((release) => ({
      title: release.title,
      id: release.id,
    }));
    // console.log("discography", discography);

    // Fetch detailed release info
    // Map over discography to fetch details for each release
    const releaseDetails = await Promise.all(
      discography.map(async (release) => {
        const releaseResponse = await fetch(
          `https://musicbrainz.org/ws/2/release/${release.id}?inc=aliases+artist-credits+labels+discids+recordings&fmt=json`,
          {
            headers: {
              "User-Agent": USER_AGENT,
            },
          }
        );
        const detailedData = await releaseResponse.json();
        console.log("detailedData", detailedData);

        return {
          ...release,
          // Basic release info
          title: detailedData.title,
          status: detailedData.status,
          date: detailedData.date,
          
          // Labels
          // labels: detailedData.labels?.map(label => ({
          //   name: label.name,
          //   catalogNumber: label['catalog-number'],
          //   id: label.id
          // })) || [],
        
          // Artist credits
          artistCredits: detailedData['artist-credit']?.map(credit => ({
            name: credit.name,
            joinPhrase: credit.joinPhrase,
            artist: {
              id: credit.artist.id,
              name: credit.artist.name,
            }
          })) || [],
        
          // Media and tracks
          media: detailedData.media?.map(medium => ({
            format: medium.format,
            tracks: medium.tracks,
          })) || [],
        
          // Release events
          events: detailedData['release-events']?.map(event => ({
            date: event.date,
            area: event.area
          })) || [],
        };
      })
    );

    return new Response(
      JSON.stringify({
        success: true,
        discography: releaseDetails,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API route error:", error);
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
