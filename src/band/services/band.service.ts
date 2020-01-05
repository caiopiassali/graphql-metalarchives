import {Injectable} from "@nestjs/common";
import * as cheerio from "cheerio";

import {ApiService, UtilsService} from "../../shared/services";

import {Band, Bands} from "../schemas";

import {AlbumsArgs, BandsArgs, MembersArgs, ReviewsArgs} from "../args";
import {Albums} from "../../album/schemas";
import {Reviews} from "../../review/schemas";
import {Member} from "../../artist/schemas";
import {MemberType} from "../../artist/enums";

@Injectable()
export class BandService {
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService
    ) {
    }

    async getBand(id: string): Promise<Band | undefined> {
        return new Promise<Band | undefined>((resolve, reject) => {
            this.apiService.get(`/bands/sieversiever/${id}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const name = $('.band_name a').text();
                    const genre = $('#band_stats .float_right dt').nextAll().eq(0).text().trim();
                    const country = $('#band_stats .float_left dt').nextAll().eq(0).text().trim();
                    const location = $('#band_stats .float_left dt').nextAll().eq(2).text().trim();
                    const lyricalThemes = $('#band_stats .float_right dt').nextAll().eq(2).text().trim();
                    const status = $('#band_stats .float_left dt').nextAll().eq(4).text().trim();
                    const label = $('#band_stats .float_right dt').nextAll().eq(4).text().trim();
                    const formYear = $('#band_stats .float_left dt').nextAll().eq(6).text().trim();
                    const yearsActive = $('#band_stats .float_right').nextAll().eq(0).children()
                        .eq(1)
                        .text()
                        .trim()
                        .replace(/[\s|\n|\t]/g, '')
                        .replace(/(\(as)/g, '(as ')
                        .replace(/(,)/g, ', ');
                    const photoUrl = $('#photo').attr('href');
                    const logoUrl = $('#logo').attr('href');
                    const band = new Band(id, name, genre, country, location, lyricalThemes, status, label, formYear, yearsActive, photoUrl, logoUrl);
                    resolve(band);
                })
                .catch(err => reject(err));
        });
    }

    async getRandomBand(): Promise<Band | undefined> {
        let rStart = await this.getBandCount() / 200;
        rStart = Math.ceil(Math.random() * Math.ceil(rStart));
        let id = null;
        await this.apiService.get(`/search/ajax-advanced/searching/bands/?&iDisplayStart=${rStart}&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4`)
            .then(({data}) => {
                let rIndex = Math.ceil(Math.random() * 200);
                const $ = cheerio.load(data.aaData[rIndex][0]);
                const aHref = $('a').attr('href');
                id = parseInt(aHref.substr(aHref.lastIndexOf('/') + 1), 10);
            });
        return await this.getBand(id);
    }

    async getBands(bandsArgs: BandsArgs): Promise<Bands[] | []> {
        const {name, genre, country, formationFrom, formationTo, status, start} = bandsArgs;
        let countries = country.map(value => `&country[]=${value}`);
        if (countries.length === 1) {
            countries.push(countries[0]);
        }
        let statuses = status.map(value => `&status[]=${value}`);
        if (statuses.length === 1) {
            statuses.push(statuses[0]);
        }
        return new Promise<Bands[] | []>((resolve, reject) => {
            this.apiService.get(`/search/ajax-advanced/searching/bands/?bandName=${name}&genre=${genre}${countries.join("")}&yearCreationFrom=${formationFrom}&yearCreationTo=${formationTo}&bandNotes=&status=${statuses.join("")}&themes=&location=&bandLabelName=&sEcho=1&iColumns=5&sColumns=&iDisplayStart=${start}&iDisplayLength=10&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4`)
                .then(({data}) => {
                    const bands = data.aaData;
                    const resp = [];
                    for (let band of bands) {
                        const $ = cheerio.load(band[0]);
                        const aHref = $('a').attr('href');
                        const id = aHref.substr(aHref.lastIndexOf('/') + 1);
                        const name = $('a').text();
                        const genre = band[1];
                        const country = band[2];
                        const bandsObj = new Bands(id, name, genre, country);
                        resp.push(bandsObj);
                    }
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }

    async getBandAlbums(id: string, albumsArgs: AlbumsArgs): Promise<Albums[] | []> {
        const {type} = albumsArgs;
        return new Promise<Albums[] | []>((resolve, reject) => {
            this.apiService.get(`/band/discography/id/${id}?tab=${type}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const albums = [];
                    $('tbody').children().each((i, element) => {
                        try {
                            const albumUrl = $(element).children().eq(0).children().attr('href');
                            const id = albumUrl.substr(albumUrl.lastIndexOf('/') + 1);
                            const name = $(element).children().eq(0).text().trim();
                            const type = $(element).children().eq(1).text().trim();
                            const releaseDate = $(element).children().eq(2).text().trim();
                            const album = new Albums(id, name, type, releaseDate);
                            albums.push(album);
                        } catch (e) {
                        }
                    });
                    resolve(albums);
                }).catch(err => reject(err));
        });
    }

    async getBandReviews(id: string, reviewsArgs: ReviewsArgs): Promise<Reviews[] | []> {
        const {start} = reviewsArgs;
        return new Promise<Reviews[] | []>((resolve, reject) => {
            this.apiService.get(`/review/ajax-list-band/id/${id}/json/1?sEcho=1&iColumns=4&sColumns=&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&iSortCol_0=3&sSortDir_0=desc&iDisplayStart=${start}`)
                .then(({data}) => {
                    const reviews = data.aaData;
                    const resp = [];
                    for (let review of reviews) {
                        const $ = cheerio.load(review[0]);
                        const aHref = $('a').attr('href');
                        const id = aHref.substr(aHref.lastIndexOf('/') + 1);
                        const albumId = this.utilsService.getAlbumReviewId(aHref);
                        const rating = review[1];
                        const date = review[3];
                        const reviewObj = new Reviews(id, albumId, rating, date);
                        resp.push(reviewObj);
                    }
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }

    async getBandMembers(bandId: string, membersArgs: MembersArgs): Promise<Member[] | []> {
        const {type: memberType} = membersArgs;
        return new Promise<Member[] | []>((resolve, reject) => {
            this.apiService.get(`/bands/sieversiever/${bandId}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const artists = $('div#band_members div#band_tab_members_all div.ui-tabs-panel-content table tbody').find('tr');
                    let members = [];
                    let type;
                    artists.each((i, el) => {
                        let id, name, role, info;
                        const elClass = $(el).attr('class');
                        if (elClass === 'lineupHeaders') {
                            type = $(el).children().eq(0).text().trim()
                                .replace(/[\n|\t]/g, '');
                            return;
                        }
                        if (elClass === 'lineupBandsRow')
                            return;
                        if (elClass === 'lineupRow') {
                            const artistUrl = $(el).find('td').eq(0).children().attr('href');
                            id = parseInt(artistUrl.substr(artistUrl.lastIndexOf('/') + 1), 10);
                            name = $(el).find('td').eq(0).children().text().trim();
                            role = $(el).children().nextAll().eq(0)
                                .text()
                                .replace(/[\n|\t]/g, '')
                                .trim();
                            info = $(el).nextAll().children().eq(0)
                                .text()
                                .trim()
                                .replace(/[\n|\t]/g, '')
                                .replace(')', ') ')
                                .replace(':', ': ')
                                .trim();
                        }
                        const member = new Member(id, name, role, info, type);
                        members.push(member);
                    });
                    switch (memberType) {
                        case MemberType.Current:
                        case MemberType.Past:
                            members = members.filter(e => e.type.toLowerCase().search(memberType) !== -1 &&
                                e.type.toLowerCase().search('live') === -1);
                            break;
                        case MemberType.Live:
                        case MemberType.LastKnown:
                            members = members.filter(e => e.type.toLowerCase().search(memberType) !== -1);
                    }
                    resolve(members);
                }).catch(err => reject(err));
        });
    }

    private async getBandCount(): Promise<number | 0> {
        return new Promise<number | 0>((resolve, reject) => {
            this.apiService.get('/search/ajax-advanced/searching/bands/')
                .then(({data}) => {
                    const count = data.iTotalRecords;
                    resolve(count);
                }).catch(err => reject(err));
        });
    }
}
