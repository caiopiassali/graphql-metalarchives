const {
    GraphQLSchema,
} = require('graphql');

const QueryType = require('./types');

module.exports = new GraphQLSchema({
    query: QueryType
});