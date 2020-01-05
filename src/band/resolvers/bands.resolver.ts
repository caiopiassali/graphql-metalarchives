import {Args, Query, Resolver} from "@nestjs/graphql";

import {BandService} from "../services";

import {Bands} from "../schemas";

import {BandsArgs} from "../args";

@Resolver(() => Bands)
export class BandsResolver {
    constructor(private readonly bandService: BandService) {
    }

    @Query(() => [Bands], {nullable: true, description: 'Band List.'})
    async bands(@Args() bandsArgs: BandsArgs): Promise<Bands[] | []> {
        return await this.bandService.getBands(bandsArgs);
    }
}
