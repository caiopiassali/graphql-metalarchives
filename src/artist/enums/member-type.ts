import {registerEnumType} from "type-graphql";

export enum MemberType {
    All = 'all',
    Current = 'current',
    LastKnown = 'last known',
    Past = 'past',
    Live = 'live'
}

registerEnumType(MemberType, {name: 'MemberType'});
