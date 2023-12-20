import { useEffect } from "react";
import { getAccessToken } from "../utils/spotifyUtils";
import { useAuth } from "./AuthProvider";


export default function Authenticator() {
    const { login }  = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            getAccessToken(code).then((token) => {
                localStorage.setItem("access_token", token);
                window.location.href = "/home";
            });
        } else {
            console.error("Authorization Code not found");
            login();
        }
    }, []);


    return (
        <div>
            <p>Authenticating...</p>
        </div>
    );
}
