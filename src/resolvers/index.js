// Resolvers //
// Band //
const { getBands, getBand, getBandDiscs } = require('./Band');
// Album //
const { getAlbum, getAlbumSongs } = require('./Album');
// Lyrics //
const { getLyrics } = require('./Lyrics');

module.exports = {
    // Band //
    getBands,
    getBand,
    getBandDiscs,
    // Album //
    getAlbum,
    getAlbumSongs,
    // Lyrics //
    getLyrics
};