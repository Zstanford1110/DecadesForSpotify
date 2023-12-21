import { useEffect } from "react";
import { getAccessToken } from "../../utils/spotifyUtils";
import { login } from "../../utils/authUtils";


export default function Authenticator() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            getAccessToken(code).then((response) => {
                localStorage.setItem("spAuth", JSON.stringify(response));
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
