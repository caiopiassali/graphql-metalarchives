const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Reviews',
    description: 'Review Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Review unique identifier.'
        },
        albumId: {
            type: GraphQLString,
            description: 'Album unique identifier.'
        },
        album: {
            type: GraphQLString,
            description: 'Album name.'
        },
        rating: {
            type: GraphQLString,
            description: 'Review rating.'
        },
        date: {
            type: GraphQLString,
            description: 'Review publication date.'
        }
    })
});
