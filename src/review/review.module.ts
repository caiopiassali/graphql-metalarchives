import {Module} from "@nestjs/common";

import {SharedModule} from "../shared/shared.module";
import {AlbumModule} from "../album/album.module";

import {ReviewResolver, ReviewsResolver} from "./resolvers";

import {ReviewService} from "./services";

@Module({
    providers: [ReviewResolver, ReviewsResolver, ReviewService],
    exports: [ReviewService],
    imports: [SharedModule, AlbumModule]
})
export class ReviewModule {
}
