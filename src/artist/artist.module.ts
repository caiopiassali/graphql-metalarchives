import {Module} from "@nestjs/common";

import {SharedModule} from "../shared/shared.module";

import {ArtistResolver} from "./resolvers";

import {ArtistService} from "./services";

@Module({
    providers: [ArtistResolver, ArtistService],
    exports: [ArtistService],
    imports: [SharedModule]
})
export class ArtistModule {
}
