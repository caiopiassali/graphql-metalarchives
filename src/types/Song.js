const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql');

// Types //
const LyricsType = require('./Lyrics');

// Resolvers //
const { getLyrics } = require('../resolvers');

module.exports = new GraphQLObjectType({
    name: 'Song',
    description: 'Song Attributes.',
    fields: () => ({
        number: {
            type: GraphQLInt,
            description: 'Song number.'
        },
        title: {
            type: GraphQLString,
            description: 'Song title.'
        },
        band: {
            type: GraphQLString,
            description: 'Band name.'
        },
        album: {
            type: GraphQLString,
            description: 'Album name.'
        },
        length: {
            type: GraphQLString,
            description: 'Song duration.'
        },
        lyricsId: {
            type: GraphQLString,
            description: 'Lyrics unique identifier.'
        },
        lyrics: {
            type: LyricsType,
            description: 'Song lyrics.',
            resolve: async (song) => await getLyrics({ id: song.lyricsId })
        }
    })
});
