'use strict'

const express = require('express');
const gqlMiddleware = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express();
const PORT = process.env.PORT || 3000

// Schema definition

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql' ), 'utf-8')
const schema = makeExecutableSchema({typeDefs, resolvers})

// graphql integration with express
app.use('/api', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: true
}));

// Server up

app.listen(PORT, () => {
    console.log(`Server it's listenning on port ${PORT} at http://localhost:${PORT}/api`);
})