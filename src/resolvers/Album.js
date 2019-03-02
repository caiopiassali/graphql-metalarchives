const Scraper = require('../helpers/scraper');

module.exports = {
    getAlbum: async (args) => await Scraper.getDisc(args.id),
    getAlbumSongs: async (args) => await Scraper.getDiscSongs(args.id),
    getAlbumReviews: async (args) => await Scraper.getDiscReviews(args.id),
    getAlbumVersions: async (args) => await Scraper.getDiscVersions(args.id)
};
