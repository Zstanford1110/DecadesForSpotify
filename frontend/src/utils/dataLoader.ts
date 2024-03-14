import { TopArtists, TopTracks, UserProfile } from "../types/spotifyTypes";
import { extractAccessToken } from "./authUtils";
import { getTopArtists, getTopTracks, spotifyRequest } from "./spotifyUtils";


// Load artists, user profile, and tracks from Spotify API
// Cache for entire session, do not reload data unless instructed to
// Handle errors that can occur during the data fetching process, restart process if possible/needed

export default async function dataLoader() {
    const accessToken = extractAccessToken();

    // Need a data structure to store the profile object, artists array, and tracks array
    const data: {
        profile: UserProfile | null,
        artists: TopArtists | null,
        tracks: TopTracks | null
    } = {
        profile: null,
        artists: null,
        tracks: null
    };

    // Fetch user's profile data
    try {
        const profileData = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);
        data.profile = profileData;
    } catch (error) {
        console.error("Error fetching user profile: ", error);
    }

    // Fetch top artists up to a certain number, let's say 200 for now
    try {
        const topArtistData = await getTopArtists(accessToken, 50, 0);
        data.artists = topArtistData;
    } catch (error) {
        console.error("Error fetching top artists: ", error);
    }

    // Fetch top tracks up to a certain number, let's say 200 for now
    try {
        const topTrackData = await getTopTracks(accessToken, 50, 0);
        data.tracks = topTrackData;
    } catch (error) {
        console.error("Error fetching top tracks: ", error);
    }

    return null;
}