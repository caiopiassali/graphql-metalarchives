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
const ReviewsType = require('./Reviews');
const ReviewType = require('./Review');

// Resolvers //
const {
    // Band //
    getBands, getBand, getRandomBand,
    // Album //
    getAlbum,
    // Lyrics //
    getLyrics,
    // Review //
    getReviewsByDate, getReview
} = require('../resolvers');

const QueryType = new GraphQLObjectType({
    name: 'Root',
    description: 'GraphQL API for metal-archives.com.',
    fields: () => ({
        // Band //
        bands: {
            type: GraphQLList(BandsType),
            description: `Get Band List.\\
                Always show 200 records (1st page), to show another page pass arg "start" with number multiple of 200.\\
                **Examples:**\\
                600 -> returns page 4\\
                11000 -> returns page 56`,
            args: {
                name: {
                    type: GraphQLString,
                    description: 'Band name.'
                },
                genre: {
                    type: GraphQLString,
                    description: 'Band genre.'
                },
                country: {
                    type: GraphQLString,
                    description: 'Country code.\nAccept multiple codes separated by coma.'
                },
                formationFrom: {
                    type: GraphQLString,
                    description: 'Initial formation year.'
                },
                formationTo: {
                    type: GraphQLString,
                    description: 'Final formation year'
                },
                status: {
                    type: GraphQLString,
                    description: 'Band status.\n' +
                        '[ `0` : Any, `1` : Active, `2` : On hold, `3` : Split-up, `4` : Unknown, `5` : Changed Name, `6` : Disputed ].\n' +
                        'Accept multiple status separated by coma.'
                },
                start: {
                    type: GraphQLInt,
                    description: 'Specifies start index to show bands.'
                }
            },
            resolve: async (root, args) => await getBands(args)
        },
        band: {
            type: BandType,
            description: 'Get Band Attributes.',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Band unique identifier.'
                }
            },
            resolve: async (root, args) => await getBand(args)
        },
        randomBand: {
            type: BandType,
            description: 'Get random Band Attributes',
            resolve: async () => await getRandomBand()
        },
        // Album //
        album: {
            type: AlbumType,
            description: 'Get Album Details.',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Album unique identifier.'
                }
            },
            resolve: async (root, args) => await getAlbum(args)
        },
        // Lyrics //
        lyrics: {
            type: LyricsType,
            description: 'Get Song Lyrics.',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Lyrics unique identifier.'
                }
            },
            resolve: async (root, args) => await getLyrics(args)
        },
        // Review //
        reviewsByDate: {
            type: GraphQLList(ReviewsType),
            description: 'Get Reviews List.',
            args: {
                year: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Publication year. Default value is current Year.',
                },
                month: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Publication month. Default value is current Month.'
                },
                sort: {
                    type: GraphQLString,
                    description: 'Sort reviews by date [`asc` | `desc`].'
                },
                start: {
                    type: GraphQLInt,
                    description: 'Specifies start index to show reviews.'
                }
            },
            resolve: async (root, args) => await getReviewsByDate(args)
        },
        review: {
            type: ReviewType,
            description: 'Get Review Attributes.',
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Review unique identifier.'
                },
                albumId: {
                    type: GraphQLNonNull(GraphQLString),
                    description: 'Album unique identifier.'
                }
            },
            resolve: async (root, args) => await getReview(args)
        }
    })
});

module.exports = QueryType;
