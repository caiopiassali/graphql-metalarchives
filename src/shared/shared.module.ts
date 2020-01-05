import {Module} from "@nestjs/common";

import {ApiService, UtilsService} from "./services";

@Module({
    providers: [ApiService, UtilsService],
    exports: [ApiService, UtilsService]
})
export class SharedModule {
}
