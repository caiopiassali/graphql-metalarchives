import {Args, Query, Resolver} from "@nestjs/graphql";

import {ArtistService} from "../services";

import {Artist} from "../schemas";

@Resolver(() => Artist)
export class ArtistResolver {
    constructor(private readonly artistService: ArtistService) {
    }

    @Query(() => Artist, {nullable: true, description: 'Artist Information.'})
    async artist(@Args('id') id: string): Promise<Artist | undefined> {
        return this.artistService.getArtist(id);
    }
}
