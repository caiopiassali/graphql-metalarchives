import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Album List Information.'
})
export class Albums {
    @Field({description: 'Album ID.'})
    id: string;

    @Field({description: 'Album Name.'})
    name: string;

    @Field({description: 'Album Type.'})
    type: string;

    @Field({description: 'Album Release Date.'})
    releaseDate: string;

    constructor(id: string, name: string, type: string, releaseDate: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.releaseDate = releaseDate;
    }
}
