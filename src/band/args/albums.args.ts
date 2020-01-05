import {ArgsType, Field} from "type-graphql";

import {BandAlbumType} from "../enums";

@ArgsType()
export class AlbumsArgs {
    @Field(() => BandAlbumType, {nullable: true, description: 'Album Type.', defaultValue: BandAlbumType.All})
    type: BandAlbumType;
}
