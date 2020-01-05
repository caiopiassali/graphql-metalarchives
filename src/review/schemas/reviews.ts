import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Reviews List Information.'
})
export class Reviews {
    @Field({description: 'Review ID.'})
    id: string;

    @Field({description: 'Album ID.'})
    albumId: string;

    @Field({description: 'Review Rating.'})
    rating: string;

    @Field({description: 'Review Date.'})
    date: string;

    constructor(id: string, albumId: string, rating: string, date: string) {
        this.id = id;
        this.albumId = albumId;
        this.rating = rating;
        this.date = date;
    }
}
