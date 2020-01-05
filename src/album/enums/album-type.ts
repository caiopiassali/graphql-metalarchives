import {registerEnumType} from "type-graphql";

export enum AlbumType {
    FullLength = 1,
    Live = 2,
    Demo = 3,
    Single = 4,
    EP = 5,
    Video = 6,
    BoxedSet = 7,
    Split = 8,
    Compilation = 9,
    SplitVideo = 10
}

registerEnumType(AlbumType, {name: 'AlbumType'});
