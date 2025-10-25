export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  uri: string;
}