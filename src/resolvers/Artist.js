const Scraper = require('../helpers/scraper');

module.exports = {
    getArtist: async (args) => await Scraper.getArtist(args.id),
};
