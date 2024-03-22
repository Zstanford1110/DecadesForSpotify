import { checkAuth } from "../../utils/authUtils";
import { redirectToAuthCodeFlow } from "../../utils/spotifyUtils";


// This function checks authentication and redirects if not authenticated.
// It returns a promise that resolves to true if authenticated, otherwise it triggers a redirect.
export async function authenticateAndRedirect() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        redirectToAuthCodeFlow();
    }
    return true;
}

