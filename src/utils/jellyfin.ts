import { Track } from "../stores/audio";

export const getAudioUrl = (
  audioId: string,
  userId: string,
  apiKey: string
) => {
  return `http://localhost:8096/Audio/${audioId}/universal?userId=${userId}&deviceId=&audioCodec=aac&api_key=${apiKey}&playSessionId&container=opus,mp3,aac,m4a,m4b,flac,wav,ogg&transcodingContainer=ts&transcodingProtocol=hls`;
};

export const getMorphedTracks = (items: any, albumImage: string, user: any) => {
  return items.map((track: any): Track => {
    const { Id, Name, AlbumId, Album, Artists, IndexNumber } = track;
    return {
      id: Id,
      albumId: AlbumId,
      albumName: Album,
      name: Name,
      artists: Artists,
      indexNumber: IndexNumber,
      image: albumImage!,
      audio: getAudioUrl(Id, user.id, user.token),
    };
  });
};
