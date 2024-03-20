import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { TopArtists, TopTracks, UserProfile } from "../types/spotifyTypes";
import { checkAuth, extractAccessToken } from "../utils/authUtils";
import { getTopArtists, getTopTracks, spotifyRequest } from "../utils/spotifyUtils";


// Load artists, user profile, and tracks from Spotify API
// Cache for entire session, do not reload data unless instructed to
// Handle errors that can occur during the data fetching process, restart process if possible/needed

// Spotify Data interface for type definition using existing types from spotifyTypes.ts
interface SpotifyData {
    profile: UserProfile | null,
    artists: TopArtists | null,
    tracks: TopTracks | null,
}

// Create a context to store Spotify Data with a default value of undefined
const SpotifyDataContext = createContext<SpotifyData | undefined>(undefined);

// Custom hook to tap into the context
export function useSpotifyData() {
    const context = useContext(SpotifyDataContext);
    if (context === undefined) {
        throw new Error("useSpotifyData must be used inside a SpotifyDataProvider");
    }
    return context;
}

export function SpotifyDataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<SpotifyData>({ profile: null, artists: null, tracks: null });
    const dataFetchedRef = useRef(false);

    useEffect(() => {
            const loadData = async () => {
                const isAuthenticated = await checkAuth();
                if(!dataFetchedRef.current && isAuthenticated) {
                    try {
                        const accessToken = extractAccessToken();
                        const profile = await spotifyRequest("https://api.spotify.com/v1/me", accessToken);
                        const artists = await getTopArtists(accessToken, 50, 0);
                        const tracks = await getTopTracks(accessToken, 50, 0);
                        setData({ profile, artists, tracks });
                    } catch (error) {
                        console.error("Error fetching Spotify data: ", error);
                    }
                }
            loadData();
            // Mark as fetched once per login, do not re-fetch during the same session
            dataFetchedRef.current = true;
        }
    }, [])

    return (
        <SpotifyDataContext.Provider value={data}>
            {children}
        </SpotifyDataContext.Provider>
    );
}

