import {Args, Parent, Query, ResolveProperty, Resolver} from "@nestjs/graphql";

import {ReviewService} from "../services";
import {AlbumService} from "../../album/services";

import {Review} from "../schemas";
import {Album} from "../../album/schemas";

import {ReviewArgs} from "../args";

@Resolver(() => Review)
export class ReviewResolver {
    constructor(
        private readonly reviewService: ReviewService,
        private readonly albumService: AlbumService
    ) {
    }

    @Query(() => Review, {nullable: true, description: 'Review Information.'})
    async review(@Args() reviewArgs: ReviewArgs): Promise<Review | undefined> {
        return this.reviewService.getReview(reviewArgs);
    }

    @ResolveProperty(('album'), () => Album, {description: 'Album.'})
    async album(@Parent() review): Promise<Album | undefined> {
        const {albumId} = review;
        return await this.albumService.getAlbum(albumId);
    }
}
