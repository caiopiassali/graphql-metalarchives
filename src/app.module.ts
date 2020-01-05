import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';

import {BandModule} from "./band/band.module";
import {AlbumModule} from "./album/album.module";
import {ReviewModule} from "./review/review.module";
import {ArtistModule} from "./artist/artist.module";

import {AppController} from "./app.controller";

@Module({
    imports: [
        BandModule,
        AlbumModule,
        ReviewModule,
        ArtistModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
        }),
    ],
    controllers: [AppController]
})
export class AppModule {
}
