const Scraper = require('../helpers/scraper');

module.exports = {
    getReviews: async (args) => {
        const year = args.year || new Date().getFullYear();
        const month = args.month ? '0' + args.month.slice(-2) : '0' + (new Date().getMonth() + 1).toString().slice(-2);
        const sort = args.sort || 'desc';
        const start = args.start || 0;
        return await Scraper.getReviews(year, month, sort, start);
    },
    getReview: async (args) => await Scraper.getReview(args.id, args.albumId)
};
