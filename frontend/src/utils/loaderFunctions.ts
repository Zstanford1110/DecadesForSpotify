import { extractAccessToken } from "./authUtils";
import { getTopArtists, spotifyRequest } from "./spotifyUtils";

export async function profileDataLoader() {
  const accessToken = extractAccessToken();
  const profileData = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);

  return profileData;
}

export async function homePageDataLoader() {
  const accessToken = extractAccessToken();
  const [topArtistData1, topArtistData2, topArtistData3, topArtistDat4] = await Promise.all([
      getTopArtists(accessToken, 50, 0),
      getTopArtists(accessToken, 50, 50),
      getTopArtists(accessToken, 50, 100),
      getTopArtists(accessToken, 50, 150), // Confirmed up to 200 so far
  ]);





  
  // Strip this entire data loader
  // Build a util function that fetches as many top artists and tracks as possible using loops
  // Perform this fetch once and cache the data (don't overload the API)
  // rate limiting between the API calls?
  // set a limit, like maybe it's only relevant to check their top 500 artists and sort them over the decades
  // Use util function here to concisely retrieve artist and track data

  // How about this: The app performs a fetch for the user's top artists and tracks on login only once, then caches the data, and
  // it continues to use the cached data until the user logs out. This way, the app doesn't overload the API with requests.
  // How do I perform the API requests on login or return from a user who has chosen to stay logged in across browser sessions?
  // How do I store the returned output?
  // How do I access the stored data and use it across all pages without needing to make API requests?
  // How do I handle errors with the initial API requests?

  const combinedTopArtistData = {
      items: [...topArtistData1.items, ...topArtistData2.items, ...topArtistData3.items, ...topArtistDat4.items],
      total: topArtistData1.total + topArtistData2.total + topArtistData3.total + topArtistDat4.total,
  };

  const profileData = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);

  return { combinedTopArtistData, profileData };
}