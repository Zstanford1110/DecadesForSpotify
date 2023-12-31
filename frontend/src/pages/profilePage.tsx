import { Link, useLoaderData } from "react-router-dom";
import { extractAccessToken } from "../utils/authUtils";
import { spotifyRequest } from "../utils/spotifyUtils";
import { UserProfile } from "../types/spotifyTypes";

export async function profileDataLoader() {
  const accessToken = extractAccessToken();
  const profileData = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);

  return profileData;
}

export function ProfilePage() {
  const profileData = useLoaderData() as UserProfile;

  // This page does not have much purpose. It is serving more as a sanity check to show that data is properly loading for the user. I plan
  // to include username and profiel image in the header/navbar of the app.
  const profileLayout = profileData ? (
    <>
      <h1>{profileData.display_name}</h1>
      <img src={profileData.images[0].url} alt="profile image" />
      <p>Follower Count: {profileData.followers.total}</p>
      <p>{profileData.country}</p>
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