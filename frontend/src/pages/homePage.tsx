import { logout } from "../utils/authUtils";
import { Link } from "react-router-dom";

import { useSpotifyData } from "../components/SpotifyDataProvider";

export default function HomePage() {
    const spotifyData = useSpotifyData();
    const topArtistData = spotifyData.artists;
    const profileData = spotifyData.profile;

    const handleLogout = () => {
        logout();
    }

    const topArtistList = topArtistData?.items?.map((artist, index) => {
        return <li key={index}>{artist.name} - {artist.popularity}</li>;
    }) || <p>No Data</p>;

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome {profileData ? profileData.display_name : "User"}!</p>
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