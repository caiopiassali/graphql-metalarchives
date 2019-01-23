const Scraper = require('../helpers/scraper');

module.exports = {
    getBands: async (args) => {
        const filter = args.filter || '';
        const start = args.start || '';
        return await Scraper.getBands(filter, start);
    },
    getBand: async (args) => await Scraper.getBand(args.id),
    getBandDiscs: async (args) => {
        const type = args.type || 'all';
        return await Scraper.getDiscog(args.id, type);
    }
};