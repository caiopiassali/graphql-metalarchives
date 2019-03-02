const Scraper = require('../helpers/scraper');
const { getMonthNumber } = require('../helpers/utils');

module.exports = {
    getReviewsByDate: async (args) => {
        const month = getMonthNumber(args.month);
        const sort = args.sort || 'desc';
        const start = args.start || 0;
        return await Scraper.getReviewsByDate(args.year, month, sort, start);
    },
    getReview: async (args) => await Scraper.getReview(args.id, args.albumId)
};
