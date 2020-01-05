import {Injectable} from "@nestjs/common";
import * as cheerio from "cheerio";

import {ApiService, UtilsService} from "../../shared/services";

import {Review, Reviews} from "../schemas";

import {ReviewArgs, ReviewsByDateArgs} from "../args";

@Injectable()
export class ReviewService {
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService
    ) {
    }

    async getReview(reviewArgs: ReviewArgs): Promise<Review | undefined> {
        const {id, albumId} = reviewArgs;
        return new Promise<Review | undefined>((resolve, reject) => {
            this.apiService.get(`/reviews///${albumId}//${id}`)
                .then(({data}) => {
                    const $ = cheerio.load(data);
                    const title = $('h3.reviewTitle').text().substring(0, $('h3.reviewTitle').text().lastIndexOf('-') - 1).trim();
                    const rating = $('h3.reviewTitle').text().substr($('h3.reviewTitle').text().lastIndexOf('-') + 1, 10).trim();
                    const divText = $('h3.reviewTitle').nextAll().eq(0).text().trim();
                    const divText2 = divText.substr(divText.indexOf(',') + 2);
                    const date = divText2.indexOf('\n') === -1 ?
                        divText2.substring(divText2.indexOf('\n')).trim() :
                        divText2.substring(0, divText2.indexOf('\n')).trim();
                    const text = $('div.reviewContent').text().trim();
                    const review = new Review(id, title, albumId, rating, date, text);
                    resolve(review);
                }).catch(err => reject(err));
        });
    }

    async getReviewsByDate(reviewsByDateArgs: ReviewsByDateArgs): Promise<Reviews[] | []> {
        const {year, month, sort, start} = reviewsByDateArgs;
        return new Promise<Reviews[] | []>((resolve, reject) => {
            this.apiService.get(`/review/ajax-list-browse/by/date/selection/${year}-${month}?sEcho=1&iColumns=7&sColumns=&iDisplayStart=${start}&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&iSortCol_0=1&sSortDir_0=${sort}`)
                .then(({data}) => {
                    const reviews = data.aaData;
                    const resp = [];
                    for (let review of reviews) {
                        const $ = cheerio.load(review[1]);
                        const aHref = $('a').attr('href');
                        const id = aHref.substr(aHref.lastIndexOf('/') + 1);
                        const albumId = this.utilsService.getAlbumReviewId(aHref);
                        const rating = review[4];
                        const date = this.utilsService.getFormattedAlbumReviewDate(review[0], year);
                        const reviewObj = new Reviews(id, albumId, rating, date);
                        resp.push(reviewObj);
                    }
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }
}
