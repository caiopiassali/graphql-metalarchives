import {Resolver, Query, Args, ResolveProperty, Parent} from "@nestjs/graphql";

import {AlbumService} from "../services";
import {BandService} from "../../band/services";

import {Album, Version, Music, AlbumReviews} from "../schemas";
import {Band} from "../../band/schemas";
import {Member} from "../../artist/schemas";

import {LineupArgs} from "../args";

@Resolver(() => Album)
export class AlbumResolver {
    constructor(
        private readonly albumService: AlbumService,
        private readonly bandService: BandService
    ) {
    }

    @Query(() => Album, {nullable: true, description: 'Album Information.'})
    async album(@Args('id') id: string): Promise<Album | undefined> {
        return this.albumService.getAlbum(id);
    }

    @ResolveProperty(('band'), () => Band, {description: 'Band.'})
    async band(@Parent() album): Promise<Band | undefined> {
        const {bandId} = album;
        return await this.bandService.getBand(bandId);
    }

    @ResolveProperty(('musics'), () => [Music], {description: 'Music List.'})
    async getAlbumMusics(@Parent() album): Promise<Music[] | []> {
        const {id} = album;
        return this.albumService.getAlbumMusics(id);
    }

    @ResolveProperty(('lineup'), () => [Member], {description: 'Members List.'})
    async getAlbumLineup(@Parent() album, @Args() lineupArgs: LineupArgs): Promise<Member[] | []> {
        const {id} = album;
        return this.albumService.getAlbumLineup(id, lineupArgs);
    }

    @ResolveProperty(('reviews'), () => [AlbumReviews], {description: 'Reviews List.'})
    async getAlbumReviews(@Parent() album): Promise<AlbumReviews[] | []> {
        const {id} = album;
        return await this.albumService.getAlbumReviews(id);
    }

    @ResolveProperty(('versions'), () => [Version], {nullable: true, description: 'Versions List.'})
    async getAlbumVersions(@Parent() album): Promise<Version[] | []> {
        const {id} = album;
        return await this.albumService.getAlbumVersions(id);
    }
}
