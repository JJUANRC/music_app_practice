import { SpotifyImageResponse } from "./spotify-image-response";

export interface SpotifyTrackResponse {

    id: string,
    name: string,
    artists: [
        {
            id: string,
            href: string,
            name: string
        }
    ],
    album: {
        id: string,
        name: string,
        images: SpotifyImageResponse[]
    },
    duration_ms: number,
    track_number: number,

}
