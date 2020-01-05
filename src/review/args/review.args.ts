import {ArgsType, Field} from "type-graphql";

@ArgsType()
export class ReviewArgs {
    @Field({description: 'Review ID.'})
    id: string;

    @Field({description: 'Album ID.'})
    albumId: string;
}
