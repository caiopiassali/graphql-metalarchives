import {registerEnumType} from "type-graphql";

export enum LineupType {
    All = 'all',
    Member = 'member',
    Guest = 'guest',
    Staff = 'staff'
}

registerEnumType(LineupType, {name: 'LineupType'});
