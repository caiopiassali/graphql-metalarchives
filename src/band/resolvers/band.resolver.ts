import {Resolver, Query, Args, ResolveProperty, Parent} from "@nestjs/graphql";

import {BandService} from "../services";

import {Band} from "../schemas";
import {Albums} from "../../album/schemas";
import {Reviews} from "../../review/schemas";
import {Member} from "../../artist/schemas";

import {AlbumsArgs, ReviewsArgs, MembersArgs} from "../args";

@Resolver(() => Band)
export class BandResolver {
    constructor(private readonly bandService: BandService) {
    }

    @Query(() => Band, {nullable: true, description: 'Band Information.'})
    async band(@Args('id') id: string): Promise<Band | undefined> {
        return await this.bandService.getBand(id);
    }

    @Query(() => Band, {nullable: true, description: 'Random Band Information.'})
    async randomBand(): Promise<Band | undefined> {
        return await this.bandService.getRandomBand();
    }

    @ResolveProperty('albums', () => [Albums], {nullable: true, description: 'Albums List.'})
    async albums(@Parent() band, @Args() albumsArgs: AlbumsArgs): Promise<Albums[] | []> {
        const {id} = band;
        return await this.bandService.getBandAlbums(id, albumsArgs);
    }

    @ResolveProperty('reviews', () => [Reviews], {nullable: true, description: 'Reviews List.'})
    async reviews(@Parent() band, @Args() reviewsArgs: ReviewsArgs): Promise<Reviews[] | []> {
        const {id} = band;
        return await this.bandService.getBandReviews(id, reviewsArgs);
    }

    @ResolveProperty(('members'), () => [Member], {nullable: true, description: 'Members List.'})
    async members(@Parent() band, @Args() membersArgs: MembersArgs): Promise<Member[] | []> {
        const {id} = band;
        return await this.bandService.getBandMembers(id, membersArgs);
    }
}
