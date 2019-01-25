const Scraper = require('../helpers/scraper');

module.exports = {
    getBands: async (args) => {
        const name = args.name || '';
        const genre = args.genre || '';
        const start = args.start || 0;
        return await Scraper.getBands(name, genre, start);
    },
    getBand: async (args) => await Scraper.getBand(args.id),
    getBandDiscs: async (args) => {
        const type = args.type || 'all';
        return await Scraper.getDiscog(args.id, type);
    },
    getBandReviews: async (args) => {
        const start = args.start || 0;
        return await Scraper.getReviews(args.id, start);
    }
};