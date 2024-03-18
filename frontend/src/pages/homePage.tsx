import { logout } from "../utils/authUtils";
import { Link, useLoaderData } from "react-router-dom";
import { TopArtists, UserProfile } from "../types/spotifyTypes";

export default function HomePage() {
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