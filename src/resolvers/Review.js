const Scraper = require('../helpers/scraper');

module.exports = {
    getReview: async (args) => await Scraper.getReview(args.id, args.albumId)
};