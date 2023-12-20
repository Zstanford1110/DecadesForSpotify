import { UserProfile } from "../types/spotifyTypes";

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectURI = import.meta.env.VITE_REDIRECT_URI;


export async function redirectToAuthCodeFlow() {
  const codeVerifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(codeVerifier);


  localStorage.setItem("codeVerifier", codeVerifier);

  const scope = "user-read-private user-read-email user-top-read";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    client_id: clientId!,
    response_type: "code",
    redirect_uri: redirectURI!,
    scope,
    code_challenge_method: "S256",
    code_challenge: challenge
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

function generateCodeVerifier(length: number) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

export async function getAccessToken(code: string): Promise<string> {
  const codeVerifier = localStorage.getItem("codeVerifier");

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId!,
      grant_type: 'authorization_code',
      code: code!,
      redirect_uri: redirectURI!,
      code_verifier: codeVerifier!,
    }),
  }

  const body = await fetch('https://accounts.spotify.com/api/token', payload);
  const response = await body.json();

  console.log(response);

  return response.access_token;
}

export function getAccessTokenFromCookie(): string | null {
  const cookies = document.cookie.split(";");
  const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith("access_token="));

  if (accessTokenCookie) return accessTokenCookie.split("=")[1];
  
  return null
}

export async function fetchProfile(token: string): Promise<UserProfile> {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}
