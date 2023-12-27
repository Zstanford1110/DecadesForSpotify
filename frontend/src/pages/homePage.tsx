import { extractAccessToken, logout } from "../utils/authUtils";
import { Link, useLoaderData } from "react-router-dom";
import { getTopArtists } from "../utils/spotifyUtils";
import { TopArtists } from "../types/spotifyTypes";

export async function homePageDataLoader() {
    const accessToken = extractAccessToken();
    const [topArtistData1, topArtistData2] = await Promise.all([
        getTopArtists(accessToken, 50, 0),
        getTopArtists(accessToken, 50, 49)
    ]);

    // Cannot set offsets over 50, so we need to remove the last item from the first request to avoid duplicates
    const topArtistData1DuplicateRemoved = topArtistData1.items.slice(0, -1);

    const combinedTopArtistData = {
        items: [...topArtistData1DuplicateRemoved, ...topArtistData2.items],
        total: topArtistData1.total + topArtistData2.total
    };

    return combinedTopArtistData;
}


export function HomePage() {
    const topArtistData = useLoaderData() as TopArtists;

    const handleLogout = () => {
        logout();
    }

    const topArtistList = topArtistData?.items?.map((artist, index) => {
        return <li key={index}>{artist.name} - {artist.popularity}</li>;
    }) || <p>No Data</p>;

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome "User"!</p>
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