const cheerio = require('cheerio');
const axios = require('axios');

const {
    getReviewAlbumId,
    formatDate
} = require('./utils');

const BASE_URL = 'https://www.metal-archives.com';
const GET_ALL_BANDS_URL = BASE_URL + '/search/ajax-advanced/searching/bands/';
const GET_BAND_URL = BASE_URL + '/bands/sieversiever/';
const GET_DISC_URL = BASE_URL + '/albums///';
const GET_DISCOG_URL = BASE_URL + '/band/discography/id/';
const SEARCH_SONGS_URL = BASE_URL + '/search/ajax-advanced/searching/songs';
const GET_LYRISC_URL = BASE_URL + '/release/ajax-view-lyrics/id/';
const GET_ALL_REVIEWS_BY_DATE_URL = BASE_URL + '/review/ajax-list-browse/by/date/selection/';
const GET_BAND_REVIEWS_URL = BASE_URL + '/review/ajax-list-band/id/';

class Scraper {
    static searchSongs(songTitle, bandName, lyrics, start, length) {
        return new Promise((resolve, reject) => {
            const searchUrl = `${SEARCH_SONGS_URL}?songTitle=${songTitle}&bandName=${bandName}&lyrics=${lyrics}&iDisplayStart=${start}&releaseType[]=1&releaseType[]=3&releaseType[]=4&releaseType[]=5`;
            console.log(searchUrl);
            axios.get(searchUrl)
                .then(({ data }) => {
                    const totalResult = data.iTotalRecords;
                    let currentResult = length > totalResult - start ? totalResult - start : length;
                    if (start < 0 || start >= totalResult) {
                        currentResult = -1;
                    }
                    let songs = data.aaData.slice(0, currentResult);
                    songs = songs.map((song) => {
                        const band = cheerio.load(song[0])('a').text();
                        const album = cheerio.load(song[1])('a').text();
                        const type = song[2];
                        const title = song[3];
                        const lyricsLink = cheerio.load(song[4])('a').attr('id');
                        const lyricsId = lyricsLink.slice(11, lyricsLink.length);
                        return {
                            title,
                            band,
                            type,
                            album,
                            lyricsId,
                        };
                    });
                    resolve({ totalResult, currentResult, songs });
                })
                .catch(err => reject(err));
        });
    }

    static getLyrics(lyricsId) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_LYRISC_URL}${lyricsId.toString()}`)
                .then(({ data }) => {
                    const lyrics = cheerio.load(data)('body').text().trim();
                    const resp = {
                        id: lyricsId,
                        lyrics
                    }
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    }

    static getBands(bandName, genre, country, formationFrom, formationTo, status, start) {
        let countries = country.split(',').map(value => `&country[]=${value}`);
        if (countries.length === 1) countries.push(countries[0]);
        let statuses = status.split(',').map(value => `&status[]=${value}`);
        if (statuses.length === 1) statuses.push(statuses[0]);
        return new Promise((resolve, reject) => {
            axios.get(`${GET_ALL_BANDS_URL}?bandName=${bandName}&genre=${genre}${countries.join("")}&yearCreationFrom=${formationFrom}&yearCreationTo=${formationTo}&bandNotes=&status=${statuses.join("")}&themes=&location=&bandLabelName=&sEcho=1&iColumns=5&sColumns=&iDisplayStart=${start}&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4`)
                .then(({data}) => {
                    const bands = data.aaData;
                    const resp = [];
                    bands.forEach((band) => {
                        const $ = cheerio.load(band[0]);
                        const aHref = $('a').attr('href');
                        const bandObj = {
                            name: $('a').text(),
                            id: parseInt(aHref.substr(aHref.lastIndexOf('/') + 1), 10),
                            genre: band[1],
                            country: band[2],
                        };
                        resp.push(bandObj);
                    });
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }

    static getBand(bandID) {
        return new Promise((resolve, reject) => {
            axios.get(GET_BAND_URL + bandID.toString())
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const id = bandID;
                    const name = $('.band_name a').text();
                    const genre = $('#band_stats .float_right dt').nextAll().eq(0).text().trim();
                    const country = $('#band_stats .float_left dt').nextAll().eq(0).text().trim();
                    const location = $('#band_stats .float_left dt').nextAll().eq(2).text().trim();
                    const themes = $('#band_stats .float_right dt').nextAll().eq(2).text().trim();
                    const status = $('#band_stats .float_left dt').nextAll().eq(4).text().trim();
                    const label = $('#band_stats .float_right dt').nextAll().eq(4).text().trim();
                    const formYear = $('#band_stats .float_left dt').nextAll().eq(6).text().trim();
                    const yearsActive = $('#band_stats .float_right').nextAll().eq(0).children()
                        .eq(1)
                        .text()
                        .trim()
                        .replace(/[\s|\n|\t]/g, '')
                        .replace(/(\(as)/g,'(as ')
                        .replace(/(,)/g,', ');
                    const photoUrl = $('#photo').attr('href');
                    const logoUrl = $('#logo').attr('href');
                    const band = {
                        id,
                        name,
                        genre,
                        country,
                        location,
                        themes,
                        status,
                        label,
                        formYear,
                        yearsActive,
                        photoUrl,
                        logoUrl,
                    };
                    resolve(band);
                }).catch(err => reject(err));
        });
    }

    static getBandCount() {
        return new Promise((resolve, reject) => {
            axios.get(GET_ALL_BANDS_URL)
                .then(({ data }) => {
                    const count = data.iTotalRecords;
                    resolve(count);
                }).catch(err => reject(err));
        });
    }

    static async getRandomBand() {
        let rStart = await this.getBandCount() / 200;
        rStart = Math.ceil(Math.random() * Math.ceil(rStart));
        let id = null;
        await axios.get(`${GET_ALL_BANDS_URL}?&iDisplayStart=${rStart}&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4`)
            .then(({ data }) => {
                let rIndex = Math.ceil(Math.random() * 200);
                const $ = cheerio.load(data.aaData[rIndex][0]);
                const aHref = $('a').attr('href');
                id = parseInt(aHref.substr(aHref.lastIndexOf('/') + 1), 10);
            });
        return await this.getBand(id);
    }

    static getDisc(albumID) {
        return new Promise((resolve, reject) => {
            axios.get(GET_DISC_URL + albumID.toString())
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const id = albumID;
                    const name = $('.album_name a').text().trim();
                    const band = $('.band_name a').text().trim();
                    const type = $('#album_content .float_left dt').nextAll().eq(0).text().trim();
                    const releaseDate = $('#album_content .float_left dt').nextAll().eq(2).text().trim();
                    const label = $('#album_content .float_right dt').nextAll().eq(0).text().trim();
                    const format = $('#album_content .float_right dt').nextAll().eq(2).text().trim();
                    const coverUrl = $('#cover').attr('href');
                    const disc = {
                        id,
                        name,
                        band,
                        type,
                        releaseDate,
                        label,
                        format,
                        coverUrl
                    };
                    resolve(disc);
                }).catch(err => reject(err));
        });
    }

    static getDiscog(bandID, type) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_DISCOG_URL + bandID.toString()}?tab=${type}`)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const discog = [];

                    $('tbody').children().each((i, element) => {
                        try {
                            const releaseUrl = $(element).children().eq(0).children()
                                .attr('href');
                            const id = parseInt(releaseUrl.substr(releaseUrl.lastIndexOf('/') + 1), 10);
                            const name = $(element).children().eq(0).text().trim();
                            const type = $(element).children().eq(1).text().trim();
                            const year = $(element).children().eq(2).text().trim();
                            discog.push({
                                id,
                                name,
                                type,
                                year,
                            });
                        } catch (e) {}
                    });
                    resolve(discog);
                }).catch(err => reject(err));
        });
    }

    static getReviewsByDate(year, month, sort, start) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_ALL_REVIEWS_BY_DATE_URL}${year}-${month}?sEcho=1&iColumns=7&sColumns=&iDisplayStart=${start}&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&iSortCol_0=1&sSortDir_0=${sort}`)
                .then(({ data }) => {
                    const reviews = data.aaData;
                    const resp = [];
                    reviews.forEach((review) => {
                        const $ = cheerio.load(review[1]);
                        const aHref = $('a').attr('href');
                        const reviewObj = {
                            id: aHref.substr(aHref.lastIndexOf('/') + 1),
                            albumId: getReviewAlbumId(aHref),
                            album: $(review[3]).text().trim(),
                            rating: review[4],
                            date: formatDate(review[0], year)
                        };
                        resp.push(reviewObj);
                    });
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }

    static getReview(reviewID, albumID) {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/reviews///${albumID}//${reviewID}`)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const id = reviewID;
                    const title = $('h3.reviewTitle').text().substring(0, $('h3.reviewTitle').text().lastIndexOf('-') - 1).trim();
                    const album = $('#album_content h1.album_name').text().trim();
                    const band = $('#album_content h2.band_name').text().trim();
                    const rating = $('h3.reviewTitle').text().substr($('h3.reviewTitle').text().lastIndexOf('-') + 1, 10).trim();
                    const divText = $('h3.reviewTitle').nextAll().eq(0).text().trim();
                    const divText2 = divText.substr(divText.indexOf(',') + 2);
                    const date = divText2.indexOf('\n') === -1 ?
                        divText2.substring(divText2.indexOf('\n')).trim() :
                        divText2.substring(0, divText2.indexOf('\n')).trim();
                    const text = $('div.reviewContent').text().trim();
                    const review = {
                        id,
                        title,
                        album,
                        band,
                        rating,
                        date,
                        text
                    };
                    resolve(review);
                }).catch(err => reject(err));
        });
    }

    static getBandReviews(bandID, start) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_BAND_REVIEWS_URL + bandID.toString()}/json/1?sEcho=1&iColumns=4&sColumns=&iDisplayLength=200&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&iSortCol_0=3&sSortDir_0=desc&iDisplayStart=${start}`)
                .then(({ data }) => {
                    const reviews = data.aaData;
                    const resp = [];
                    reviews.forEach((review) => {
                        const $ = cheerio.load(review[0]);
                        const aHref = $('a').attr('href');
                        const reviewObj = {
                            id: parseInt(aHref.substr(aHref.lastIndexOf('/') + 1), 10),
                            albumId: getReviewAlbumId(aHref),
                            album: $('a').text().trim(),
                            rating: review[1],
                            date: review[3]
                        };
                        resp.push(reviewObj);
                    });
                    resolve(resp);
                }).catch(err => reject(err));
        });
    }
    static getDiscSongs(discID) {
        return new Promise((resolve, reject) => {
            axios.get(GET_DISC_URL + discID.toString())
                .then(({ data }) => {
                    let songs = [];
                    const $ = cheerio.load(data);
                    const band = $('.band_name a').text();
                    const album = $('.album_name a').text();
                    const discSongs = $('#album_tabs table.display.table_lyrics tbody').find('tr');
                    discSongs.each((i, el) => {
                        const elClass = $(el).attr('class');
                        if (elClass !== 'even' && elClass !== 'odd') {
                            return;
                        }
                        const number = $(el).find('td').eq(0).text();
                        const title = $(el).find('td').eq(1).text().trim();
                        const length = $(el).find('td').eq(2).text();
                        const lyricsId = $(el).nextAll().find('td[id*=lyrics_]').attr('id').replace('lyrics_','');
                        const song = {
                            number,
                            title,
                            band,
                            album,
                            length,
                            lyricsId
                        };
                        songs.push(song);
                    });
                    resolve(songs);
                }).catch(err => reject(err));
        });
    }


    static getDiscReviews(albumID) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_DISC_URL + albumID.toString()}`)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const reviews = [];

                    $('#album_tabs_reviews table#review_list tbody').children().each((i, el) => {
                        try {
                            const reviewUrl = $(el).children().eq(0).children()
                                .attr('href');
                            const id = parseInt(reviewUrl.substr(reviewUrl.lastIndexOf('/') + 1), 10);
                            const title = $(el).children().nextAll().eq(0).text().trim();
                            const rating = $(el).children().nextAll().eq(1).text().trim();
                            const date = $(el).children().nextAll().eq(3).text().trim();
                            reviews.push({
                                id,
                                title,
                                rating,
                                date
                            });
                        } catch (e) {}
                    });
                    resolve(reviews);
                }).catch(err => reject(err));
        });
    }

    static async getDiscVersions(albumID) {
        let GET_DISC_VERSIONS = '';
        await axios.get(GET_DISC_URL + albumID.toString())
            .then(({ data }) => {
                const $ = cheerio.load(data);
                $('ul.ui-tabs-nav').find('li').each((i, el) => {
                    if ($(el).eq(0).children().text().trim().toLowerCase() === 'other versions')
                        GET_DISC_VERSIONS = $(el).eq(0).children().attr('href');
                });
            });
        return GET_DISC_VERSIONS === '' ? [] : new Promise((resolve, reject) => {
            axios.get(GET_DISC_VERSIONS)
                .then(({ data }) => {
                    const $ = cheerio.load(data);
                    const versions = [];

                    $('table.display tbody').children().each((i, el) => {
                        const versionUrl = $(el).children().eq(0).children()
                            .attr('href');
                        const id = parseInt(versionUrl.substr(versionUrl.lastIndexOf('/') + 1), 10);
                        const releaseDate = $(el).children().eq(0).children().text().trim()
                            .replace(/(Unofficial)/g,' (Unofficial)');
                        const label = $(el).children().eq(1).text().trim();
                        const format = $(el).children().eq(3).text().trim();
                        const description = $(el).children().eq(4).text().trim();
                        versions.push({
                            id,
                            releaseDate,
                            label,
                            format,
                            description
                        })
                    });
                    resolve(versions);
                }).catch(err => reject(err));
        });
    }
}

module.exports = Scraper;
