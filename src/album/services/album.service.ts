import {Injectable} from "@nestjs/common";
import * as cheerio from 'cheerio';

import {ApiService} from "../../shared/services";

import {Album, Albums, Version, Music, AlbumReviews} from "../schemas";

import {AlbumsArgs, LineupArgs} from "../args";
import {LineupType} from "../enums";
import {Member} from "../../artist/schemas";

@Injectable()
export class AlbumService {
    constructor(private apiService: ApiService) {
    }

    async getAlbum(id: string): Promise<Album | undefined> {
        return new Promise<Album | undefined>((resolve, reject) => {
            this.apiService.get(`/albums///${id}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const name = $('.album_name a').text().trim();
                    const bandHref = $('.band_name a').attr('href');
                    const bandId = bandHref.substr(bandHref.lastIndexOf('/') + 1);
                    const type = $('#album_content .float_left dt').nextAll().eq(0).text().trim();
                    const releaseDate = $('#album_content .float_left dt').nextAll().eq(2).text().trim();
                    const label = $('#album_content .float_right dt').nextAll().eq(0).text().trim();
                    const format = $('#album_content .float_right dt').nextAll().eq(2).text().trim();
                    const catalogId = $('#album_content .float_left dt').nextAll().eq(4).text().trim();
                    const versionDescription = $('#album_content .float_left dt').nextAll().eq(6).text().trim();
                    let limitation = $('#album_content .float_right dt').nextAll().eq(3).text().trim().toLowerCase();
                    if (limitation === 'limitation:') {
                        limitation = $('#album_content .float_right dt').nextAll().eq(4).text().trim();
                    } else {
                        limitation = '';
                    }
                    const coverUrl = $('#cover').attr('href');
                    const album = new Album(id, name, bandId, type, releaseDate, label, format, catalogId, limitation, versionDescription, coverUrl);
                    resolve(album);
                }).catch(err => reject(err));
        });
    }

    async getAlbums(albumsArgs: AlbumsArgs): Promise<Albums[] | []> {
        const {band, title, genre, type, start} = albumsArgs;
        const types = type.map(value => `&releaseType[]=${value}`);
        if (types.length === 1) {
            types.push(types[0]);
        }
        const yearFrom = '1900';
        const monthFrom = '01';
        return new Promise<Albums[] | []>((resolve, reject) => {
            this.apiService.get(`/search/ajax-advanced/searching/albums/?bandName=${band}&releaseTitle=${title}&releaseYearFrom=${yearFrom}&releaseMonthFrom=${monthFrom}&releaseYearTo=&releaseMonthTo=&location=&releaseLabelName=&releaseCatalogNumber=&releaseIdentifiers=&releaseRecordingInfo=&releaseDescription=&releaseNotes=&genre=${genre}${types.join("")}&sEcho=1&iColumns=4&sColumns=&iDisplayStart=${start}&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3`)
                .then(({data}) => {
                    const albums = data.aaData;
                    const resp = [];
                    for (let album of albums) {
                        const $ = cheerio.load(album[1]);
                        const aHref = $('a').attr('href');
                        const id = aHref.substr(aHref.lastIndexOf('/') + 1);
                        const name = $('a').text();
                        const type = album[2];
                        const releaseDate = album[album.length - 1].substr(0, album[album.length - 1].indexOf('<') - 1);
                        const albumsObj = new Albums(id, name, type, releaseDate);
                        resp.push(albumsObj);
                    }
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }

    async getAlbumVersions(albumId: string): Promise<Version[] | []> {
        let GET_DISC_VERSIONS = '';
        await this.apiService.get(`/albums///${albumId}`)
            .then(({data}) => {
                const $ = cheerio.load(data);
                $('ul.ui-tabs-nav').find('li').each((i, el) => {
                    if ($(el).eq(0).children().text().trim().toLowerCase() === 'other versions')
                        GET_DISC_VERSIONS = $(el).eq(0).children().attr('href');
                });
            });
        return GET_DISC_VERSIONS === '' ? [] : new Promise<Version[] | []>((resolve, reject) => {
            this.apiService.get(GET_DISC_VERSIONS)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const versions = [];
                    $('table.display tbody').children().each((i, el) => {
                        const versionUrl = $(el).children().eq(0).children()
                            .attr('href');
                        const id = versionUrl.substr(versionUrl.lastIndexOf('/') + 1);
                        const releaseDate = $(el).children().eq(0).children().text().trim()
                            .replace(/(Unofficial)/g, ' (Unofficial)');
                        const label = $(el).children().eq(1).text().trim();
                        const format = $(el).children().eq(3).text().trim();
                        const description = $(el).children().eq(4).text().trim();
                        const version = new Version(id, releaseDate, label, format, description);
                        versions.push(version);
                    });
                    resolve(versions);
                }).catch(err => reject(err));
        });
    }

    async getAlbumMusics(id: string): Promise<Music[] | undefined> {
        return new Promise<Music[] | undefined>((resolve, reject) => {
            this.apiService.get(`/albums///${id}`)
                .then(async ({data}) => {
                    let musics = [];
                    const $ = cheerio.load(data);
                    const albumMusics = $('#album_tabs table.display.table_lyrics tbody').find('tr');
                    for (const index of Object.keys(albumMusics)) {
                        const el = albumMusics[index];
                        const elClass = $(el).attr('class');
                        if (elClass !== 'even' && elClass !== 'odd') {
                            continue;
                        }
                        const id = $(el).nextAll().find('td[id*=lyrics_]').attr('id').replace('lyrics_', '');
                        const number = $(el).find('td').eq(0).text().replace('.', '').trim();
                        const title = $(el).find('td').eq(1).text().trim();
                        const length = $(el).find('td').eq(2).text();
                        const lyrics = await this.getMusicLyrics(id);
                        const music = new Music(id, number, title, length, lyrics);
                        musics.push(music);
                    }
                    resolve(musics);
                }).catch(err => reject(err));
        });
    }

    async getMusicLyrics(id: string): Promise<string | undefined> {
        return new Promise<string | undefined>((resolve, reject) => {
            this.apiService.get(`/release/ajax-view-lyrics/id/${id}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const lyrics = $('body').text().trim();
                    resolve(lyrics);
                })
                .catch(err => reject(err));
        });
    }

    async getAlbumLineup(albumId: string, lineupArgs: LineupArgs): Promise<Member[] | []> {
        const {type: lineupType} = lineupArgs;
        return new Promise<Member[] | []>((resolve, reject) => {
            this.apiService.get(`/albums///${albumId}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const discLineup = $('div#album_members div#album_all_members_lineup div.ui-tabs-panel-content table tbody').find('tr');
                    let lineup = [];
                    let type;
                    discLineup.each((i, el) => {
                        let id, name, role;
                        const elClass = $(el).attr('class');
                        if (elClass === 'lineupHeaders') {
                            type = $(el).children().eq(0).text().trim()
                                .replace(/[\n|\t]/g, '');
                            return;
                        }
                        const artistUrl = $(el).find('td').eq(0).children().attr('href');
                        id = parseInt(artistUrl.substr(artistUrl.lastIndexOf('/') + 1), 10);
                        name = $(el).find('td').eq(0).children().text().trim();
                        role = $(el).children().nextAll().eq(0).text().replace(/\t/g, '').trim();
                        const member = new Member(id, name, role, "", type);
                        lineup.push(member);
                    });
                    if (lineupType !== LineupType.All) {
                        lineup = lineup.filter(e => e.type.toLowerCase().search(lineupType) !== -1);
                    }
                    resolve(lineup);
                }).catch(err => reject(err));
        });
    }

    async getAlbumReviews(albumId: string): Promise<AlbumReviews[] | []> {
        return new Promise<AlbumReviews[] | []>((resolve, reject) => {
            this.apiService.get(`/albums///${albumId}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const reviews = [];
                    $('#album_tabs_reviews table#review_list tbody').children().each((i, el) => {
                        try {
                            const reviewUrl = $(el).children().eq(0).children()
                                .attr('href');
                            const id = reviewUrl.substr(reviewUrl.lastIndexOf('/') + 1);
                            const title = $(el).children().nextAll().eq(0).text().trim();
                            const rating = $(el).children().nextAll().eq(1).text().trim();
                            const date = $(el).children().nextAll().eq(3).text().trim();
                            const review = new AlbumReviews(id, title, rating, date);
                            reviews.push(review);
                        } catch (e) {
                        }
                    });
                    resolve(reviews);
                }).catch(err => reject(err));
        });
    }
}
