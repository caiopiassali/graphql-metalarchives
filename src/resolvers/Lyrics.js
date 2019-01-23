const Scraper = require('../helpers/scraper');

module.exports = {
    getLyrics: async (args) => await Scraper.getLyrics(args.id)
};