import {Args, Query, Resolver} from "@nestjs/graphql";

import {AlbumService} from "../services";

import {Albums} from "../schemas";

import {AlbumsArgs} from "../args";

@Resolver(() => Albums)
export class AlbumsResolver {
    constructor(private readonly albumService: AlbumService) {
    }

    @Query(() => [Albums], {nullable: true, description: 'Album List.'})
    async albums(@Args() albumsArgs: AlbumsArgs): Promise<Albums[] | []> {
        return this.albumService.getAlbums(albumsArgs);
    }
}
