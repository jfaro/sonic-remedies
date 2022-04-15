export interface ITrack {
    title: string,
    album: string,
    artist: string,
    filename: string,
    genre: Array<string>,
    improv: boolean,
    texture: boolean,
    keySignature: Array<string>,
    length: number,
    tempo: number,
    admin: string,
    dateAdded: string,
    url: string
}