const Scraper = require('../helpers/scraper');

module.exports = {
    getAlbum: async (args) => await Scraper.getDisc(args.id),
    getAlbumSongs: async (args) => await Scraper.getDiscSongs(args.id),
    getAlbumReviews: async (args) => await Scraper.getDiscReviews(args.id),
    getAlbumVersions: async (args) => await Scraper.getDiscVersions(args.id),
    getAlbumLineup: async (args) => {
        const type = args.type || 'all';
        const response = await Scraper.getDiscLineup(args.id);
        switch (type) {
            case 'all':
                return response;
            case 'member':
            case 'guest':
            case 'staff':
                return response.filter(e => e.type.toLowerCase().search(type) !== -1);
            default:
                return [];
        }
    }
};
