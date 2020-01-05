import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Album Review Information.'
})
export class AlbumReviews {
    @Field({description: 'Review ID.'})
    id: string;

    @Field({description: 'Review Title.'})
    title: string;

    @Field({description: 'Review Rating.'})
    rating: string;

    @Field({description: 'Review Date.'})
    date: string;

    constructor(id: string, title: string, rating: string, date: string) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.date = date;
    }
}
