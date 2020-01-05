import {Field, ObjectType} from "type-graphql";

import {Album} from "../../album/schemas";

@ObjectType({
    description: 'Review Information.'
})
export class Review {
    @Field({description: 'Review ID.'})
    id: string;

    @Field({description: 'Review Title.'})
    title: string;

    albumId: string;

    @Field(() => Album, {description: 'Album.'})
    album: Album;

    @Field({description: 'Review Rating.'})
    rating: string;

    @Field({description: 'Review Date.'})
    date: string;

    @Field({description: 'Review Text.'})
    text: string;

    constructor(id: string, title: string, albumId: string, rating: string, date: string, text: string) {
        this.id = id;
        this.title = title;
        this.albumId = albumId;
        this.rating = rating;
        this.date = date;
        this.text = text;
    }
}
