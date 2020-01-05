import {GraphQLString} from "graphql";
import {ArgsType, Field, Int} from "type-graphql";
import {Min} from "class-validator";

import {BandStatus} from "../enums";

@ArgsType()
export class BandsArgs {
    @Field({nullable: true, description: 'Band Name.', defaultValue: ''})
    name: string;

    @Field({nullable: true, description: 'Band Genre.', defaultValue: ''})
    genre: string;

    @Field(type => [GraphQLString], {nullable: true, description: 'Band Country.', defaultValue: []})
    country: string[];

    @Field({nullable: true, description: 'Year of Formation.', defaultValue: ''})
    formationFrom: string;

    @Field({nullable: true, description: 'Year of Formation.', defaultValue: ''})
    formationTo: string;

    @Field(type => [BandStatus], {nullable: true, description: 'Band Status.', defaultValue: []})
    status: BandStatus[];

    @Field(type => Int, {nullable: true, defaultValue: 0})
    @Min(0)
    start: number;
}
