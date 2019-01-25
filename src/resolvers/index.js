// Resolvers //
// Band //
const { getBands, getBand, getBandDiscs, getBandReviews } = require('./Band');
// Album //
const { getAlbum, getAlbumSongs, getAlbumReviews } = require('./Album');
// Lyrics //
const { getLyrics } = require('./Lyrics');
// Review //
const { getReview } = require('./Review');

module.exports = {
    // Band //
    getBands,
    getBand,
    getBandDiscs,
    getBandReviews,
    // Album //
    getAlbum,
    getAlbumSongs,
    getAlbumReviews,
    // Lyrics //
    getLyrics,
    // Review //
    getReview
};