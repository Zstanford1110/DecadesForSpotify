import { useEffect, useState } from "react";
import { checkAuth } from "../../utils/authUtils";
import { redirectToAuthCodeFlow } from "../../utils/spotifyUtils";

export default function PrivateRouteLoader() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        const authenticate = async () => {
            const authStatus = await checkAuth();
            setIsAuthenticated(authStatus);
        };

        authenticate();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated) {
        redirectToAuthCodeFlow();
        return <div>Redirecting to login...</div>;
    }

    return null;
}
