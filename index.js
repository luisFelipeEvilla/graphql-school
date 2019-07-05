'use strict'

require('dotenv').config()
const express = require('express');
const cors = require('cors')
const gqlMiddleware = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express();
const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'

// Schema definition

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql' ), 'utf-8')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors())

// graphql integration with express
app.use('/api', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: isDev
}));

// Server up

app.listen(PORT, () => {
    console.log(`Server it's listenning on port ${PORT} at http://localhost:${PORT}/api`);
})