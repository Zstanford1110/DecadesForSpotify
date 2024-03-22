import { redirectToAuthCodeFlow, spotifyRequest } from "./spotifyUtils";

export async function checkAuth(): Promise<boolean> {
    const spAuth = localStorage.getItem("spAuth");

    // First case, check if the spAuth exists at all
    if (!spAuth) {
        return false;
    }
    
    // Extract the access token, make sure that it exists
    const accessToken = extractAccessToken();
    if (!accessToken || accessToken === "No Access Token") {
        return false;
    }

    // Check the validity of the access token against the Spotify API
    try {
        await spotifyRequest("https://api.spotify.com/v1/me", accessToken);
        return true;
    } catch (error) {
        console.error("Access token is invalid");
        return false;
    }

}

export function extractAccessToken(): string {
    const spAuth = localStorage.getItem("spAuth");
    let input = "";
    if (spAuth) {
        input = spAuth;
    }
    const regex = /"access_token":"([^"]+)"/;
    const match = input.match(regex);
    if (match) {
        return match[1];
    }
    return "No Access Token";
}

export function extractRefreshToken(): string {
    const spAuth = localStorage.getItem("spAuth");
    let input = "";
    if (spAuth) {
        input = spAuth;
    }
    const regex = /"refresh_token":"([^"]+)"/;
    const match = input.match(regex);
    if (match) {
        return match[1];
    }
    return "No Refresh Token";
}

export function login() {
    redirectToAuthCodeFlow();
}

export function logout() {
    localStorage.removeItem("spAuth");
    localStorage.removeItem("codeVerifier");
    window.location.href = "/login";
}