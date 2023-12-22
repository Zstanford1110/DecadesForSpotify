import { useLoaderData } from "react-router-dom";
import { extractAccessToken } from "../utils/authUtils";
import { spotifyRequest } from "../utils/spotifyUtils";
import { UserProfile } from "../types/spotifyTypes";

export async function ProfileDataLoader() {
  const accessToken = extractAccessToken();
  const profileData = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);

  return profileData;
}

export function ProfilePage() {
  const profileData = useLoaderData() as UserProfile;

  return (
    <>
      <h1>Display your Spotify profile data</h1>
      { profileData ? <p>{profileData.display_name}</p> : <p>No data</p> }
    </>
  )
}