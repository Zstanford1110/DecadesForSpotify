import { extractAccessToken, logout } from "../utils/authUtils";
import { Link, useLoaderData } from "react-router-dom";
import { getTopArtists, spotifyRequest } from "../utils/spotifyUtils";
import { TopArtists, UserProfile } from "../types/spotifyTypes";

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

    // Cannot set offsets over 50, so we need to remove the last item from the first request to avoid duplicates
    // Shouldn't need this anymore if my offsets are correct
    // const topArtistData1DuplicateRemoved = topArtistData1.items.slice(0, -1);

    const combinedTopArtistData = {
        items: [...topArtistData1.items, ...topArtistData2.items, ...topArtistData3.items, ...topArtistDat4.items],
        total: topArtistData1.total + topArtistData2.total + topArtistData3.total + topArtistDat4.total,
    };

    const profileData = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);

    return { combinedTopArtistData, profileData };
}


export function HomePage() {
    const fetchedData = useLoaderData() as { combinedTopArtistData: TopArtists, profileData: UserProfile };
    const topArtistData = fetchedData.combinedTopArtistData;
    const profileData = fetchedData.profileData;

    const handleLogout = () => {
        logout();
    }

    const topArtistList = topArtistData?.items?.map((artist, index) => {
        return <li key={index}>{artist.name} - {artist.popularity}</li>;
    }) || <p>No Data</p>;

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome {profileData.display_name}!</p>
            <Link to="/profile">
                <button>Go to Profile</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>

            <div>
                <h2>Top Artists</h2>
                <ol>
                    {topArtistList}
                </ol>
            </div>

        </div>
    );
}