import { createContext, useContext } from "react";
import { SpotifyData } from "../../types/spotifyTypes";

export const SpotifyDataContext = createContext<SpotifyData | undefined>(undefined);

export function useSpotifyData() {
  const context = useContext(SpotifyDataContext);
  if (context === undefined) {
      throw new Error("useSpotifyData must be used inside a SpotifyDataProvider");
  }
  return context;
}