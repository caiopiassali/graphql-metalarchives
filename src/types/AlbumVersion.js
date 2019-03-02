const {
    GraphQLObjectType,
    GraphQLString
} = require ('graphql');

module.exports = new GraphQLObjectType({
    name: 'AlbumVersion',
    description: 'Version attributes.',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Album unique identifier.'
        },
        releaseDate: {
            type: GraphQLString,
            description: 'Release date.'
        },
        label: {
            type: GraphQLString,
            description: 'Album label.'
        },
        format: {
            type: GraphQLString,
            description: 'Album format.'
        },
        description: {
            type: GraphQLString,
            description: 'Version description.'
        },
    })
});
