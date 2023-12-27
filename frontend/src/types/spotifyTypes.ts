export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean,
    filter_locked: boolean
  },
  external_urls: { spotify: string; };
  followers: { href: string; total: number; };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface TopArtists {
  items: Artist[];
  total: number;
  limit: number;
  offset: number;
  previous: string;
  href: string;
  next: string;
}

export interface Artist {
  external_urls: { spotify: string; };
  followers: { href: string; total: number; };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}