import {registerEnumType} from "type-graphql";

export enum BandAlbumType {
    All = 'all',
    FullLength = 'main',
    Lives = 'lives',
    Demos = 'demos',
    Miscellaneous = 'misc'
}

registerEnumType(BandAlbumType, {name: 'BandAlbumType'});
