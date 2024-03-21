import { Link } from "react-router-dom";
import { useSpotifyData } from "../utils/hooks/useSpotifyData";


export default function ProfilePage() {
  const { profile } = useSpotifyData();

  // This page does not have much purpose. It is serving more as a sanity check to show that data is properly loading for the user. I plan
  // to include username and profile image in the header/navbar of the app.
  const profileLayout = profile ? (
    <>
      <h1>{profile.display_name}</h1>
      <img src={profile.images[0].url} alt="profile image" />
      <p>Follower Count: {profile.followers.total}</p>
      <p>{profile.country}</p>
    </>
  ) : (
    <p>No data</p>
  );

  return (
    <>
      {profileLayout}
      <Link to="/home">
        <button>Go Home</button>
      </Link >
    </>
  )
}