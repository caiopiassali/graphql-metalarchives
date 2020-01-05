import {ArgsType, Field} from "type-graphql";

import {LineupType} from "../enums";

@ArgsType()
export class LineupArgs {
    @Field(type => LineupType, {nullable: true, description: 'Lineup Type.', defaultValue: LineupType.All})
    type: LineupType;
}
