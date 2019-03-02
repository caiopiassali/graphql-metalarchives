const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'AlbumReview',
    description: 'Review Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Review unique identifier.'
        },
        title: {
            type: GraphQLString,
            description: 'Review title.'
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
