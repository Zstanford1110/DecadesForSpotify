import { redirectToAuthCodeFlow } from "./spotifyUtils";

export function checkAuth(): boolean {
    const spAuth = localStorage.getItem("spAuth");
    let accessToken = null;
    if (spAuth) {
        accessToken = extractAccessToken();
    }

    if (!spAuth || accessToken === "No Access Token") {
        return false;
    }

    return true;
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