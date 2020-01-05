import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Music Information.'
})
export class Music {
    @Field({description: 'Music ID.'})
    id: string;

    @Field({description: 'Music Number At Album.'})
    number: string;

    @Field({description: 'Music Title.'})
    title: string;

    @Field({description: 'Music Length.'})
    length: string;

    @Field({description: 'Music Lyrics.'})
    lyrics: string;

    constructor(id: string, number: string, title: string, length: string, lyrics: string) {
        this.id = id;
        this.number = number;
        this.title = title;
        this.length = length;
        this.lyrics = lyrics;
    }
}
