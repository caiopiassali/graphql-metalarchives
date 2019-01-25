const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

// Types //
const BandsType = require('./Bands');
const BandType = require('./Band');
const AlbumType = require('./Album');
const LyricsType = require('./Lyrics');
const ReviewType = require('./Review');

// Resolvers //
const {
    // Band //
    getBands, getBand,
    // Album //
    getAlbum,
    // Lyrics //
    getLyrics,
    // Review //
    getReview
} = require('../resolvers');

const QueryType = new GraphQLObjectType({
    name: 'Root',
    description: 'Metal Archives Bands, Albums & Songs',
    fields: () => ({
        // Band //
        bands: {
            type: GraphQLList(BandsType),
            description: `Get Band List.\\
                Always show 200 records (1st page), to show another page pass arg "start" with number multiple of 200\\
                **Examples:**\\
                600 -> returns page 4\\
                11000 -> returns page 56`,
            args: {
                name: {
                    type: GraphQLString,
                    description: 'Query band name'
                },
                genre: {
                    type: GraphQLString,
                    description: 'Query band genre'
                },
                start: {
                    type: GraphQLInt,
                    description: 'Specifies start index to show bands'
                }
            },
            resolve: async (root, args) => await getBands(args)
        },
        band: {
            type: BandType,
            description: 'Get Band Attributes',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Band unique identifier'
                }
            },
            resolve: async (root, args) => await getBand(args)
        },
        // Album //
        album: {
            type: AlbumType,
            description: 'Get Album Details',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Album unique identifier'
                }
            },
            resolve: async (root, args) => await getAlbum(args)
        },
        // Lyrics //
        lyrics: {
            type: LyricsType,
            description: 'Get Song Lyrics',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Lyrics unique identifier'
                }
            },
            resolve: async (root, args) => await getLyrics(args)
        },
        // Review //
        review: {
            type: ReviewType,
            description: 'Get Review Attributes',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Review unique identifier'
                },
                albumId: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Album unique identifier'
                }
            },
            resolve: async (root, args) => await getReview(args)
        }
    })
});

module.exports = QueryType;
