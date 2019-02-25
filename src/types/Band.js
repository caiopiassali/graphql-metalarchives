const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

// Types //
const AlbumsType = require('./Albums');
const ReviewsType = require('./Reviews');

// Resolvers //
const { getBandDiscs, getBandReviews } = require('../resolvers');

module.exports = new GraphQLObjectType({
    name: 'Band',
    description: 'Band Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Band unique identifier.'
        },
        name: {
            type: GraphQLString,
            description: 'Band name.'
        },
        genre: {
            type: GraphQLString,
            description: 'Band genres.'
        },
        country: {
            type: GraphQLString,
            description: 'Country of origin.'
        },
        location: {
            type: GraphQLString,
            description: 'Origin location.'
        },
        themes: {
            type: GraphQLString,
            description: 'Lyrics themes.'
        },
        status: {
            type: GraphQLString,
            description: 'Band status.'
        },
        label: {
            type: GraphQLString,
            description: 'Current label.'
        },
        formYear: {
            type: GraphQLString,
            description: 'Formation year.'
        },
        yearsActive: {
            type: GraphQLString,
            description: 'Years active.'
        },
        photoUrl: {
            type: GraphQLString,
            description: 'Band photo url.'
        },
        logoUrl: {
            type: GraphQLString,
            description: 'Band logo url.'
        },
        discography: {
            type: GraphQLList(AlbumsType),
            description: 'Band discography.',
            args: {
                type: {
                    type: GraphQLString,
                    description: 'Albums type. [`all` | `main` | `lives` | `demos` | `misc`].'
                }
            },
            resolve: async (band, args) => await getBandDiscs({ id: band.id, type: args.type })
        },
        reviews: {
            type: GraphQLList(ReviewsType),
            description: `Band reviews.\\
                (Always show 200 records).`,
            args: {
                start: {
                    type: GraphQLInt,
                    description: 'Specifies start index to show reviews.'
                }
            },
            resolve: async (band, args) => await getBandReviews({ id: band.id, start: args.start })
        }
    })
});
