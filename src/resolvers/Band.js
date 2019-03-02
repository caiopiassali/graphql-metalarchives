const Scraper = require('../helpers/scraper');

module.exports = {
    getBands: async (args) => {
        const name = args.name || '';
        const genre = args.genre || '';
        const country = args.country || '';
        const formationFrom = args.formationFrom || '';
        const formationTo = args.formationTo || '';
        const status = args.status || '';
        const start = args.start || 0;
        return await Scraper.getBands(name, genre, country, formationFrom, formationTo, status, start);
    },
    getBand: async (args) => await Scraper.getBand(args.id),
    getRandomBand: async () => await Scraper.getRandomBand(),
    getBandDiscs: async (args) => {
        const type = args.type || 'all';
        return await Scraper.getDiscog(args.id, type);
    },
    getBandReviews: async (args) => {
        const start = args.start || 0;
        return await Scraper.getBandReviews(args.id, start);
    }
};
