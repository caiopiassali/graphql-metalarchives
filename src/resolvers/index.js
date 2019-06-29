// Resolvers //
// Band //
const { getBands, getBand, getRandomBand, getBandDiscs, getBandReviews, getBandMembers } = require('./Band');
// Album //
const { getAlbums, getAlbum, getAlbumSongs, getAlbumReviews, getAlbumVersions, getAlbumLineup } = require('./Album');
// Lyrics //
const { getLyrics } = require('./Lyrics');
// Review //
const { getReviewsByDate, getReview } = require('./Review');
// Artist //
const { getArtist } = require('./Artist');

module.exports = {
    // Band //
    getBands,
    getBand,
    getRandomBand,
    getBandDiscs,
    getBandReviews,
    getBandMembers,
    // Album //
    getAlbums,
    getAlbum,
    getAlbumSongs,
    getAlbumReviews,
    getAlbumVersions,
    getAlbumLineup,
    // Lyrics //
    getLyrics,
    // Review //
    getReviewsByDate,
    getReview,
    // Artist //
    getArtist
};
