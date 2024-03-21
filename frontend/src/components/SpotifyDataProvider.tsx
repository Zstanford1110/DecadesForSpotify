import { ReactNode, useEffect, useRef, useState } from "react";
import { SpotifyData} from "../types/spotifyTypes";
import { checkAuth, extractAccessToken } from "../utils/authUtils";
import { getTopArtists, getTopTracks, spotifyRequest } from "../utils/spotifyUtils";
import { SpotifyDataContext } from "../utils/hooks/useSpotifyData";


// Load artists, user profile, and tracks from Spotify API
// Cache for entire session, do not reload data unless instructed to
// Handle errors that can occur during the data fetching process, restart process if possible/needed


export function SpotifyDataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<SpotifyData>({ profile: null, artists: null, tracks: null });
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        const loadData = async () => {
            const isAuthenticated = await checkAuth();
            if (!dataFetchedRef.current && isAuthenticated) {
                try {
                    const accessToken = extractAccessToken();
                    const profile = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);
                    const artists = await getTopArtists(accessToken, 50, 0);
                    const tracks = await getTopTracks(accessToken, 50, 0);
                    setData({ profile, artists, tracks });
                    // Mark as fetched once per login, do not re-fetch during the same session
                    dataFetchedRef.current = true;
                } catch (error) {
                    console.error("Error fetching Spotify data: ", error);
                }
            }
        }

        loadData();
    }, [])

    return (
        <SpotifyDataContext.Provider value={data}>
            {children}
        </SpotifyDataContext.Provider>
    );
}

