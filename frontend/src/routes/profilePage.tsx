import { useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile, populateUI } from "../utils/spotifyUtils";


export default function ProfilePage() {

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = async () => {
    const clientId = "a7656102b57f42fbb9eb73a9cfc1cf9f";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = await getAccessToken(clientId, code);
      const profile = await fetchProfile(accessToken);
      populateUI(profile);
    }
  }

  return (
    <>
      <h1>Display your Spotify profile data</h1>

      <section id="profile">
        <h2>Logged in as <span id="displayName"></span></h2>
        <span id="avatar"></span>
        <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
        </ul>
      </section>
    </>
  )
}