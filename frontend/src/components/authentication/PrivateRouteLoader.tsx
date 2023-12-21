import { checkAuth } from "../../utils/authUtils";
import { redirectToAuthCodeFlow } from "../../utils/spotifyUtils";

export default function PrivateRouteLoader() {

    if (!checkAuth()) {
        return redirectToAuthCodeFlow();
    }
    return null;
}
