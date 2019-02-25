const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Albums',
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
        type: {
            type: GraphQLString,
            description: 'Album type.'
        },
        year: {
            type: GraphQLString,
            description: 'Release year.'
        }
    })
});
