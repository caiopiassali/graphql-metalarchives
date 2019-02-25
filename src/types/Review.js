const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Review',
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
        album: {
            type: GraphQLString,
            description: 'Album name.'
        },
        band: {
            type: GraphQLString,
            description: 'Band name.'
        },
        rating: {
            type: GraphQLString,
            description: 'Review rating.'
        },
        date: {
            type: GraphQLString,
            description: 'Review publication date.'
        },
        text: {
            type: GraphQLString,
            description: 'Review text.'
        }
    })
});
