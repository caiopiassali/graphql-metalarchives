import {ArgsType, Field} from "type-graphql";

import {MemberType} from "../../artist/enums";

@ArgsType()
export class MembersArgs {
    @Field(type => MemberType, {nullable: true, description: 'Member Type.', defaultValue: MemberType.All})
    type: MemberType;
}
