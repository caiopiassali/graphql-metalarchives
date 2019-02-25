const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Lyrics',
    description: 'Song Lyrics Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Lyrics unique identifier.'
        },
        lyrics: {
            type: GraphQLString,
            description: 'Lyrics.'
        }
    })
});
