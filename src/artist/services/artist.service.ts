import {Injectable} from "@nestjs/common";
import * as cheerio from 'cheerio';

import {ApiService} from "../../shared/services";

import {Artist} from "../schemas";

@Injectable()
export class ArtistService {
    constructor(private apiService: ApiService) {
    }

    async getArtist(id: string): Promise<Artist | undefined> {
        return new Promise<Artist | undefined>((resolve, reject) => {
            this.apiService.get(`/artists//${id}`)
                .then(async ({data}) => {
                    const $ = cheerio.load(data);
                    const name = $('.band_member_name').text();
                    const realName = $('#member_info .float_left dt').nextAll().eq(0).text().trim();
                    const age = $('#member_info .float_left dt').nextAll().eq(2).text().trim();
                    const origin = $('#member_info .float_right dt').nextAll().eq(0).text().trim();
                    const gender = $('#member_info .float_right dt').nextAll().eq(2).text().trim();
                    const photoUrl = $('#artist.image').attr('href');
                    const biography = await this.getArtistBiography(id);
                    const trivia = await this.getArtistTrivia(id);
                    const artist = new Artist(id, name, realName, age, origin, gender, photoUrl, biography, trivia);
                    resolve(artist);
                }).catch(err => reject(err));
        });
    }

    async getArtistBiography(id: string): Promise<string | undefined> {
        return new Promise<string | undefined>((resolve, reject) => {
            this.apiService.get(`/artist/read-more/id/${id}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const biography = $('body').text().trim();
                    resolve(biography);
                }).catch(err => reject(err));
        });
    }

    async getArtistTrivia(id: string): Promise<string | undefined> {
        return new Promise<string | undefined>((resolve, reject) => {
            this.apiService.get(`/artist/read-more/id/${id}/field/trivia`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const trivia = $('body').text().trim();
                    resolve(trivia);
                }).catch(err => reject(err));
        });
    }
}
