import { useState, useEffect, ReactNode } from "react";
import { redirectToAuthCodeFlow } from "../utils/spotifyUtils";


interface AuthenticatorProps {
  children: ReactNode;
}

export default function Authenticator({ children }: AuthenticatorProps) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const clientId = "a7656102b57f42fbb9eb73a9cfc1cf9f";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // TODO: Implement authentication flow when user visits a protected route (all routes except login)
    if (!code) {
      // Authorize user
      redirectToAuthCodeFlow(clientId);
    } else {
     // Acquire and securely store access token
    }
  }

  return (
    authenticated ? <>{children}</> : <h1>Not authenticated</h1>
  );

}
