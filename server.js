const { GraphQLServer } = require('graphql-yoga');

const schema = require('./src/schema');

const server = new GraphQLServer({
    schema
});

const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: ['/playground', '/']
};

server.start(options, ({ port }) => console.log(`Server listening on port ${port}`));