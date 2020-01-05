import {registerEnumType} from "type-graphql";

export enum Sort {
    Asc = 'asc',
    Desc = 'desc'
}

registerEnumType(Sort, {name: 'Sort'});
