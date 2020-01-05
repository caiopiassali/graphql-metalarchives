import {ArgsType, Field, Int} from "type-graphql";
import {Min} from "class-validator";

import {AlbumType} from "../enums";

@ArgsType()
export class AlbumsArgs {
    @Field({nullable: true, description: 'Band Name.', defaultValue: ''})
    band: string;

    @Field({nullable: true, description: 'Album Title.', defaultValue: ''})
    title: string;

    @Field({nullable: true, description: 'Album Genre.', defaultValue: ''})
    genre: string;

    @Field(type => [AlbumType], {nullable: true, description: 'Album Type.', defaultValue: []})
    type: AlbumType[];

    @Field(type => Int, {nullable: true, defaultValue: 0})
    @Min(0)
    start: number;
}
