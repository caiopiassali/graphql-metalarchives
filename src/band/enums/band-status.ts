import {registerEnumType} from "type-graphql";

export enum BandStatus {
    Any,
    Active,
    OnHold,
    SplitUp,
    Unknown,
    ChangedName,
    Disputed,
}

registerEnumType(BandStatus, {name: 'Status'});
