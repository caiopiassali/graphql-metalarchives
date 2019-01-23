const cheerio = require('cheerio');
const axios = require('axios');

//const GET_ALL_BANDS_URL = 'https://www.metal-archives.com/search/ajax-advanced/searching/bands/?iDisplayStart=';
const GET_ALL_BANDS_URL = 'https://www.metal-archives.com/search/ajax-band-search/?field=name&query=';
const GET_BAND_URL = 'https://www.metal-archives.com/bands/sieversiever/';
const GET_DISC_URL = 'https://www.metal-archives.com/albums///';
const GET_DISCOG_URL = 'https://www.metal-archives.com/band/discography/id/';
const SEARCH_SONGS_URL = 'https://www.metal-archives.com/search/ajax-advanced/searching/songs';
const GET_LYRISC_URL = 'https://www.metal-archives.com/release/ajax-view-lyrics/id/';

class Scraper {
    static searchSongs(songTitle, bandName, lyrics, start, length) {
        return new Promise((resolve, reject) => {
            const searchUrl = `${SEARCH_SONGS_URL}?songTitle=${songTitle}&bandName=${bandName}&lyrics=${lyrics}&iDisplayStart=${start}&releaseType[]=1&releaseType[]=3&releaseType[]=4&releaseType[]=5`;
            console.log(searchUrl);
            axios.get(searchUrl, { timeout: 10000 })
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

    static getDiscSongs(discID) {
        return new Promise((resolve, reject) => {
            axios.get(GET_DISC_URL + discID.toString(), { timeout: 5000 }).then(({ data }) => {
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

    static getLyrics(lyricsId) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_LYRISC_URL}${lyricsId.toString()}`)
                .then(({ data }) => {
                    const lyrics = cheerio.load(data)('body').text();
                    const resp = {
                        id: lyricsId,
                        lyrics
                    }
                    resolve(resp);
                })
                .catch(err => reject(err));
        });
    }

    static getBands(filter, start) {
        return new Promise((resolve, reject) => {
            axios.get(`${GET_ALL_BANDS_URL}${filter}&iDisplayStart=${start}`)
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
            axios.get(GET_BAND_URL + bandID.toString(), { timeout: 5000 }).then(({ data }) => {
                const $ = cheerio.load(data);
                const id = bandID;
                const name = $('.band_name a').text();
                const genre = $('#band_stats .float_right dt').nextAll().eq(0).text();
                const country = $('#band_stats .float_left dt').nextAll().eq(0).text();
                const location = $('#band_stats .float_left dt').nextAll().eq(2).text();
                const themes = $('#band_stats .float_right dt').nextAll().eq(2).text();
                const status = $('#band_stats .float_left dt').nextAll().eq(4).text();
                const label = $('#band_stats .float_right dt').nextAll().eq(4).text();
                const formYear = $('#band_stats .float_left dt').nextAll().eq(6).text();
                const yearsActive = $('#band_stats .float_right').nextAll().eq(0).children()
                    .eq(1)
                    .text()
                    .replace(/\s/g, '');
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
                .then(({data}) => {
                    const count = data.iTotalRecords;
                    resolve(count);
                }).catch(err => reject(err));
        });
    }

    static getDisc(discID) {
        return new Promise((resolve, reject) => {
            axios.get(GET_DISC_URL + discID.toString(), { timeout: 5000 }).then(({ data }) => {
                const $ = cheerio.load(data);
                const id = discID;
                const name = $('.album_name a').text();
                const band = $('.band_name a').text();
                const type = $('#album_content .float_left dt').nextAll().eq(0).text();
                const releaseDate = $('#album_content .float_left dt').nextAll().eq(2).text();
                const label = $('#album_content .float_right dt').nextAll().eq(0).text();
                const format = $('#album_content .float_right dt').nextAll().eq(2).text();
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
            axios.get(`${GET_DISCOG_URL + bandID.toString()}?tab=${type}`, { timeout: 5000 }).then(({ data }) => {
                const $ = cheerio.load(data);
                const discog = [];

                $('tbody').children().each((i, element) => {
                    try {
                        const releaseUrl = $(element).children().eq(0).children()
                            .attr('href');
                        const id = parseInt(releaseUrl.substr(releaseUrl.lastIndexOf('/') + 1), 10);
                        const name = $(element).children().eq(0).text();
                        const type = $(element).children().eq(1).text();
                        const year = $(element).children().eq(2).text();
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
}

module.exports = Scraper;
