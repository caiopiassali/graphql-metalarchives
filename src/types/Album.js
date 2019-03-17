const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');

// Types //
const SongType = require('./Song');
const MemberType = require('./Member');
const AlbumReview = require('./AlbumReview');
const AlbumVersion = require('./AlbumVersion');

// Resolvers //
const { getAlbumSongs, getAlbumReviews, getAlbumVersions, getAlbumLineup } = require('../resolvers');

module.exports = new GraphQLObjectType({
    name: 'Album',
    description: 'Album Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Album unique identifier.'
        },
        name: {
            type: GraphQLString,
            description: 'Album name.'
        },
        band: {
            type: GraphQLString,
            description: 'Band name.'
        },
        type: {
            type: GraphQLString,
            description: 'Album type.'
        },
        releaseDate: {
            type: GraphQLString,
            description: 'Release date.'
        },
        label: {
            type: GraphQLString,
            description: 'Album label.'
        },
        format: {
            type: GraphQLString,
            description: 'Album format.'
        },
        catalogId: {
            type: GraphQLString,
            description: 'Catalog ID.'
        },
        limitation: {
            type: GraphQLString,
            description: 'Album limitation.'
        },
        versionDescription: {
            type: GraphQLString,
            description: 'Version description.'
        },
        coverUrl: {
            type: GraphQLString,
            description: 'Album cover url.'
        },
        songs: {
            type: GraphQLList(SongType),
            description: 'Album songs list.',
            resolve: async (disc) => await getAlbumSongs({ id: disc.id })
        },
        lineup: {
            type: GraphQLList(MemberType),
            description: 'Album lineup.',
            args: {
                type: {
                    type: GraphQLString,
                    description: 'Type. [`all` | `member` | `guest` | `staff`].'
                }
            },
            resolve: async (disc, args) => await getAlbumLineup({ id: disc.id, type: args.type })
        },
        reviews: {
            type: GraphQLList(AlbumReview),
            description: 'Album reviews.',
            resolve: async (disc) => await getAlbumReviews({ id: disc.id })
        },
        versions: {
            type: GraphQLList(AlbumVersion),
            description: 'Album versions.',
            resolve: async (disc) => await getAlbumVersions({ id: disc.id })
        }
    })
});
