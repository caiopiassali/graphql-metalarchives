const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');

// Types //
const AlbumsType = require('./Albums');

// Resolvers //
// Band //
const { getBandDiscs } = require('../resolvers/Band');

module.exports = new GraphQLObjectType({
    name: 'Band',
    description: 'Band Attributes',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Band unique identifier'
        },
        name: {
            type: GraphQLString,
            description: 'Band name'
        },
        genre: {
            type: GraphQLString,
            description: 'Band genres'
        },
        country: {
            type: GraphQLString,
            description: 'Country of origin'
        },
        location: {
            type: GraphQLString,
            description: 'Origin location'
        },
        themes: {
            type: GraphQLString,
            description: 'Lyrics themes'
        },
        status: {
            type: GraphQLString,
            description: 'Band status'
        },
        label: {
            type: GraphQLString,
            description: 'Current label'
        },
        formYear: {
            type: GraphQLString,
            description: 'Formation year'
        },
        yearsActive: {
            type: GraphQLString,
            description: 'Years active'
        },
        photoUrl: {
            type: GraphQLString,
            description: 'Band photo url'
        },
        logoUrl: {
            type: GraphQLString,
            description: 'Band logo url'
        },
        discography: {
            type: GraphQLList(AlbumsType),
            description: 'Band discography',
            args: {
                type: {
                    type: GraphQLString,
                    description: 'Albums type. Can be (`null` or `all`), `main`, `lives`, `demos` or `misc`'
                }
            },
            resolve: async (band, args) => await getBandDiscs({ id: band.id, type: args.type })
        }
    })
});