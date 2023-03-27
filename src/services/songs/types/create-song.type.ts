export type CreateSong = {
  data: {
    album_id: Array<string>;
    name: String;
    artist: String;
    genre: Array<string>;
  };
  audio: File;
  thumb_nail: File;
};
