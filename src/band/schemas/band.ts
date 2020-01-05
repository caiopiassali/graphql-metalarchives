import {Field, ObjectType} from "type-graphql";

import {Albums} from "../../album/schemas";
import {Reviews} from "../../review/schemas";
import {Member} from "../../artist/schemas";

@ObjectType({
    description: 'Band Information.'
})
export class Band {
    @Field({description: 'Band ID.'})
    id: string;

    @Field({description: 'Band Name.'})
    name: string;

    @Field({description: 'Band Genre.'})
    genre: string;

    @Field({description: 'Band Country.'})
    country: string;

    @Field({description: 'Band Location.'})
    location: string;

    @Field({description: 'Band Lyrics Themes.'})
    lyricalThemes: string;

    @Field({description: 'Band Status.'})
    status: string;

    @Field({description: 'Band Current Label.'})
    label: string;

    @Field({description: 'Band Formation Year.'})
    formationYear: string;

    @Field({description: 'Band Active Period.'})
    yearsActive: string;

    @Field({nullable: true, description: 'Band Photo.'})
    photoUrl: string;

    @Field({nullable: true, description: 'Band Logo.'})
    logoUrl: string;

    @Field(() => [Albums], {description: 'Albums List.'})
    albums: Albums[];

    @Field(() => [Reviews], {description: 'Reviews List.'})
    reviews: Reviews[];

    @Field(() => [Member], {description: 'Members List.'})
    members: Member[];

    constructor(id: string, name: string, genre: string, country: string, location: string, lyricalThemes: string, status: string, label: string, formationYear: string, yearsActive: string, photoUrl: string, logoUrl: string) {
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.country = country;
        this.location = location;
        this.lyricalThemes = lyricalThemes;
        this.status = status;
        this.label = label;
        this.formationYear = formationYear;
        this.yearsActive = yearsActive;
        this.photoUrl = photoUrl;
        this.logoUrl = logoUrl;
    }
}
