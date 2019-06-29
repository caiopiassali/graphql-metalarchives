const Scraper = require('../helpers/scraper');

module.exports = {
    getAlbums: async (args) => {
        const band = args.band || '';
        const title = args.title || '';
        const genre = args.genre || '';
        const type = args.type || ''
        const start = args.start || 0;
        return await Scraper.getDiscs(band, title, genre, type, start);
    },
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
