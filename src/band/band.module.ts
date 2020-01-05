import {Module} from "@nestjs/common";

import {SharedModule} from "../shared/shared.module";

import {BandResolver, BandsResolver} from "./resolvers";

import {BandService} from "./services";

@Module({
    providers: [BandResolver, BandsResolver, BandService],
    exports: [BandService],
    imports: [SharedModule]
})
export class BandModule {
}
