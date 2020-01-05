import {registerEnumType} from "type-graphql";

export enum Month {
    January = '01',
    February = '02',
    March = '03',
    April = '04',
    May = '05',
    June = '06',
    July = '07',
    August = '08',
    September = '09',
    October = '10',
    November = '11',
    December = '12'
}

registerEnumType(Month, {name: 'Month'});
