import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Band List Information.'
})
export class Bands {
    @Field({description: 'Band ID.'})
    id: string;

    @Field({description: 'Band Name.'})
    name: string;

    @Field({description: 'Band Genre.'})
    genre: string;

    @Field({description: 'Band Country.'})
    country: string;

    constructor(id: string, name: string, genre: string, country: string) {
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.country = country;
    }
}
