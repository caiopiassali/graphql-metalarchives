const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Artist',
    description: 'Artist Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Artist unique identifier.'
        },
        name: {
            type: GraphQLString,
            description: 'Artist name.'
        },
        realName: {
            type: GraphQLString,
            description: 'Real/full name.'
        },
        age: {
            type: GraphQLString,
            description: 'Artist age.'
        },
        origin: {
            type: GraphQLString,
            description: 'Place of origin.'
        },
        gender: {
            type: GraphQLString,
            description: 'Artist gender.'
        },
        photoUrl: {
            type: GraphQLString,
            description: 'Artist photo url.'
        },
        biography: {
            type: GraphQLString,
            description: 'Artist biography.'
        },
        trivia: {
            type: GraphQLString,
            description: 'Other information.'
        }
    })
});
