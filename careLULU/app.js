const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
var cors = require('cors')

const graphqlSchema =require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolver')
const logger = require('./config/logger')
const { authContextMiddleware } = require('./middleware/authContext')

const expressPlayground = require('graphql-playground-middleware-express').default

const app = express()

app.use(cors())
app.use(bodyParser.json())

// Middleware to extract user context using JWT Token (if present)
app.use(authContextMiddleware)

//creating connection to database and running migrations.
logger.info("creating connection with mysql....")
require('./config/connectDB')


//graphql middleware for setting up schema and resolvers
app.use('/api', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))


const server = () => app.listen(3000, ()=>console.log("listning on port 3000..."))

module.exports = {
    app,
    server
}
