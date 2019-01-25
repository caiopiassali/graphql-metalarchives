const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');

// Types //
const SongType = require('./Song');
const AlbumReviews = require('./AlbumReviews');

// Resolvers //
const { getAlbumSongs, getAlbumReviews } = require('../resolvers');

module.exports = new GraphQLObjectType({
    name: 'Album',
    description: 'Album Attributes',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Album unique identifier'
        },
        name: {
            type: GraphQLString,
            description: 'Album name'
        },
        band: {
            type: GraphQLString,
            description: 'Band name'
        },
        type: {
            type: GraphQLString,
            description: 'Album yype'
        },
        releaseDate: {
            type: GraphQLString,
            description: 'Release date'
        },
        label: {
            type: GraphQLString,
            description: 'Album label'
        },
        format: {
            type: GraphQLString,
            description: 'Album format'
        },
        coverUrl: {
            type: GraphQLString,
            description: 'Album cover url'
        },
        songs: {
            type: GraphQLList(SongType),
            description: 'Album songs list',
            resolve: async (disc) => await getAlbumSongs({ id: disc.id })
        },
        reviews: {
            type: GraphQLList(AlbumReviews),
            description: 'Album reviews',
            resolve: async (disc) => await getAlbumReviews({ id: disc.id })
        }
    })
});