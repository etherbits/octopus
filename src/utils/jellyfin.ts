import { Track } from "../stores/audio";

export const clientInfo =
  'MediaBrowser Client="Octopus", Device="PC", DeviceId="Octopus", Version="0.0.0"';

export const getAudioUrl = (
  audioId: string,
  userId: string,
  apiKey: string,
) => {
  return `http://localhost:8096/Audio/${audioId}/universal?userId=${userId}&deviceId=&audioCodec=aac&api_key=${apiKey}&playSessionId&container=opus,mp3,aac,m4a,m4b,flac,wav,ogg&transcodingContainer=ts&transcodingProtocol=hls`;
};

export const getMorphedTracks = (items: any, albumImage: string, user: any) => {
  return items.map((track: any): Track => {
    const {
      Id,
      Name,
      AlbumId,
      Album,
      ProductionYear,
      Artists,
      IndexNumber,
      RunTimeTicks,
    } = track;
    return {
      id: Id,
      name: Name,
      albumId: AlbumId,
      albumName: Album,
      productionYear: ProductionYear,
      artists: Artists,
      indexNumber: IndexNumber,
      durationS: ticksToS(RunTimeTicks),
      image: albumImage!,
      audio: getAudioUrl(Id, user.id, user.token),
    };
  });
};

export const ticksToS = (ticks: number) => ticks / (10000 * 1000);
