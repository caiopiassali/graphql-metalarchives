import {Field, ObjectType} from "type-graphql";

import {Band} from "../../band/schemas";
import {Member} from "../../artist/schemas";
import {AlbumReviews} from "./albumreviews";
import {Version} from "./version";
import {Music} from "./music";

@ObjectType({
    description: 'Album Information.'
})
export class Album {
    @Field({description: 'Album ID.'})
    id: string;

    @Field({description: 'Album Name.'})
    name: string;

    bandId: string;

    @Field(() => Band, {description: 'Band.'})
    band: Band;

    @Field({description: 'Album Type.'})
    type: string;

    @Field({description: 'Album Release Date.'})
    releaseDate: string;

    @Field({description: 'Album Label.'})
    label: string;

    @Field({description: 'Album Format.'})
    format: string;

    @Field({description: 'Album Catalog ID.'})
    catalogId: string;

    @Field({nullable: true, description: 'Album Limitation.'})
    limitation: string;

    @Field({nullable: true, description: 'Version Description.'})
    versionDescription: string;

    @Field({description: 'Album Cover.'})
    coverUrl: string;

    @Field(type => [Music], {description: 'Music List.'})
    musics: Music[];

    @Field(returns => [Member], {description: 'Member List.'})
    lineup: Member[];

    @Field(returns => [AlbumReviews], {description: 'Reviews List.'})
    reviews: AlbumReviews[];

    @Field(returns => [Version], {description: 'Other Versions.'})
    versions: Version[];

    constructor(id: string, name: string, bandId: string, type: string, releaseDate: string, label: string, format: string, catalogId: string, limitation: string, versionDescription: string, coverUrl: string) {
        this.id = id;
        this.name = name;
        this.bandId = bandId;
        this.type = type;
        this.releaseDate = releaseDate;
        this.label = label;
        this.format = format;
        this.catalogId = catalogId;
        this.limitation = limitation;
        this.versionDescription = versionDescription;
        this.coverUrl = coverUrl;
    }
}
