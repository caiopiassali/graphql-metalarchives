import {ArgsType, Field, Int} from "type-graphql";
import {Min} from "class-validator";

import {Month} from "../enums";
import {Sort} from "../../shared/enums";

@ArgsType()
export class ReviewsByDateArgs {
    @Field({description: 'Review Year.'})
    @Min(1900)
    year: number;

    @Field(() => Month, {description: 'Review Month'})
    month: Month;

    @Field(() => Sort, {nullable: true, description: 'Sort Order.', defaultValue: Sort.Desc})
    sort: Sort;

    @Field(() => Int, {nullable: true, defaultValue: 0})
    @Min(0)
    start: number;
}
