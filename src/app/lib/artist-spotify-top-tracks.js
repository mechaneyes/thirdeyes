export const spotifyTopTracks = async (query) => {
  const response = await fetch(
    // `https://thirdeyes-backend.vercel.app/google?form-input=${query}`
    // `http://127.0.0.1:5328/identify-artists?form-input=${query}`
    `http://127.0.0.1:5328/spotify-deets?form-input=${query}`
  );
  const data = await response.json();
  // query !== null && setReturnedData(data);
  console.log("artistMatch", data);

  return data;
};
