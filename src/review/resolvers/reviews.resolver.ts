import {Args, Query, Resolver} from "@nestjs/graphql";

import {ReviewService} from "../services";

import {Reviews} from "../schemas";
import {ReviewsByDateArgs} from "../args";

@Resolver(() => Reviews)
export class ReviewsResolver {
    constructor(
        private readonly reviewService: ReviewService
    ) {
    }

    @Query(() => [Reviews], {nullable: true, description: 'Reviews List By Date.'})
    async reviewsByDate(@Args() reviewsByDateArgs: ReviewsByDateArgs): Promise<Reviews[] | []> {
        return this.reviewService.getReviewsByDate(reviewsByDateArgs);
    }
}
