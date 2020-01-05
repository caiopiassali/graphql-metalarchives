import {Field, ObjectType} from "type-graphql";

@ObjectType({
    description: 'Artist Information.'
})
export class Artist {
    @Field({description: 'Artist ID.'})
    id: string;

    @Field({description: 'Artist Name.'})
    name: string;

    @Field({description: 'Artist Real Name.'})
    realName: string;

    @Field({description: 'Artist Age.'})
    age: string;

    @Field({description: 'Artist Place of Origin.'})
    origin: string;

    @Field({description: 'Artist Gender.'})
    gender: string;

    @Field({description: 'Artist Photo.'})
    photoUrl: string;

    @Field({description: 'Artist Biography.'})
    biography: string;

    @Field({description: 'Artist Trivia.'})
    trivia: string;

    constructor(id: string, name: string, realName: string, age: string, origin: string, gender: string, photoUrl: string, biography: string, trivia: string) {
        this.id = id;
        this.name = name;
        this.realName = realName;
        this.age = age;
        this.origin = origin;
        this.gender = gender;
        this.photoUrl = photoUrl;
        this.biography = biography;
        this.trivia = trivia;
    }
}
