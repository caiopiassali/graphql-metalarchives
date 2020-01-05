import {ArgsType, Field, Int} from "type-graphql";
import {Min} from "class-validator";

@ArgsType()
export class ReviewsArgs {
    @Field(type => Int, {nullable: true, defaultValue: 0})
    @Min(0)
    start: number;
}
