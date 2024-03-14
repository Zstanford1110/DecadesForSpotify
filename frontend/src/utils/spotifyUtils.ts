import { AccessTokenResponse, TopArtists, TopTracks } from "../types/spotifyTypes";
import { extractRefreshToken } from "./authUtils";

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

export async function getAccessToken(code: string): Promise<AccessTokenResponse> {
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

  return response;
}

export async function refreshAccessToken(): Promise<AccessTokenResponse> {
  const refreshToken = extractRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken!,
      client_id: clientId!,
    }),
  }

  const body = await fetch('https://accounts.spotify.com/api/token', payload);
  const response = await body.json();

  return response;

}

export async function spotifyRequest(url: string, token: string) {
  const result = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  // If bad request or unauthorized, refresh access token and try again
  // Need to double check this implementation. This could create INFINITE requests if not careful.
  if (result.status === 400 || result.status === 401) {
    const newAuth = await refreshAccessToken();
    localStorage.setItem("spAuth", newAuth.toString());
    return spotifyRequest(url, newAuth.access_token);
  }

  return await result.json();
}

// Limit is the number of records to return (max = 50), Offset is the starting index to start returning from (use to retrieve more than the top 50)
export async function getTopArtists(token: string, limit: number, offset: number): Promise<TopArtists> {
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=long_term&offset=${offset}&limit=${limit}`;
  return await spotifyRequest(url, token);
}

export async function getTopTracks(token: string, limit: number, offset: number): Promise<TopTracks> {
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=long_term&offset=${offset}&limit=${limit}`;
  return await spotifyRequest(url, token);
}




// Loading on scroll for songs and artists