const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Bands',
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
        }
    })
});
