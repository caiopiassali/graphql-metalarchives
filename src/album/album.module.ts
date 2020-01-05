import {Module} from "@nestjs/common";

import {SharedModule} from "../shared/shared.module";
import {BandModule} from "../band/band.module";

import {AlbumResolver, AlbumsResolver} from "./resolvers";

import {AlbumService} from "./services";

@Module({
    providers: [AlbumResolver, AlbumsResolver, AlbumService],
    exports: [AlbumService],
    imports: [SharedModule, BandModule]
})
export class AlbumModule {
}
