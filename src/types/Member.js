const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Member',
    description: 'Member Attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Review unique identifier.'
        },
        name: {
            type: GraphQLString,
            description: 'Member name.'
        },
        role: {
            type: GraphQLString,
            description: 'Role in the band.'
        },
        info: {
            type: GraphQLString,
            description: 'Other and past bands.'
        },
        type: {
            type: GraphQLString,
            description: 'Member type.'
        }
    })
});
