import { redirectToAuthCodeFlow } from "./spotifyUtils";

export function checkAuth() {
    const spAuth = localStorage.getItem("spAuth");
    let accessToken = null;
    if (spAuth) {
        accessToken = extractAccessToken(spAuth!);
    }

    if (accessToken) {
        return true;
    }

    return false;
}
export function extractAccessToken(input: string): string | null {
    const regex = /"access_token":"([^"]+)"/;
    const match = input.match(regex);
    return match ? match[1] : null;
}

export function login() {
    redirectToAuthCodeFlow();
}

export function logout() {

}