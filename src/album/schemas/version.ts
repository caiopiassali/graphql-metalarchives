import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Album Version Information.'
})
export class Version {
    @Field({description: 'Album ID.'})
    id: string;

    @Field({description: 'Album Release Date.'})
    releaseDate: string;

    @Field({description: 'Album Label.'})
    label: string;

    @Field({description: 'Album Format.'})
    format: string;

    @Field({description: 'Version Description.'})
    description: string;

    constructor(id: string, releaseDate: string, label: string, format: string, description: string) {
        this.id = id;
        this.releaseDate = releaseDate;
        this.label = label;
        this.format = format;
        this.description = description;
    }
}
