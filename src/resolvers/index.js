// Resolvers //
// Band //
const { getBands, getBand, getRandomBand, getBandDiscs, getBandReviews } = require('./Band');
// Album //
const { getAlbum, getAlbumSongs, getAlbumReviews, getAlbumVersions } = require('./Album');
// Lyrics //
const { getLyrics } = require('./Lyrics');
// Review //
const { getReviewsByDate, getReview } = require('./Review');

module.exports = {
    // Band //
    getBands,
    getBand,
    getRandomBand,
    getBandDiscs,
    getBandReviews,
    // Album //
    getAlbum,
    getAlbumSongs,
    getAlbumReviews,
    getAlbumVersions,
    // Lyrics //
    getLyrics,
    // Review //
    getReviewsByDate,
    getReview
};
