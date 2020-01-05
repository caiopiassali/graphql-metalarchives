import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Member Information.'
})
export class Member {
    @Field({description: 'Artist ID.'})
    id: string;

    @Field({description: 'Artist Name.'})
    name: string;

    @Field({description: 'Member Role.'})
    role: string;

    @Field({description: 'Member Information.'})
    info: string;

    @Field({description: 'Member Type.'})
    type: string;

    constructor(id: string, name: string, role: string, info: string, type: string) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.info = info;
        this.type = type;
    }
}
