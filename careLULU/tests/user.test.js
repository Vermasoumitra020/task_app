const sequelize = require('../config/database')
const logger = require('../config/logger')
const assert = require('assert')
const {app} = require('../app')
const {generateUser} = require("./db");

const request = require('supertest')(app)


describe('Initial Test', () => {
    let dbConnection = sequelize

    // Before any tests run, clear the DB and run migrations with Sequelize sync()
    beforeAll( async () => {
        logger.info("Creating database connection....")
        dbConnection = await dbConnection.sync({force:true})
    })

    it('tests successful user register',  async () => {

        const res = await request
                        .post('/api')
                        .send({
                            query: `mutation {
                                      createUser(userData: {
                                        first_name: "John",
                                        last_name: "Doe",
                                        email: "john.doe@email.com",
                                        username: "john020",
                                        password: "john020"
                                      }) {id
                                        first_name
                                        last_name
                                        email
                                        username
                                        access_token
                                      }
                                    }`
                            })
                        .set("Accept", "application/json")
        const data = JSON.parse(res.toJSON().text)
        assert.equal(res.status, 200);
        assert.equal(data.data.createUser.username, 'john020')
    })

    it('tests successful user login',  async () => {
        const user = await generateUser({password: 'randomPassword'})
        const res = await request
            .post('/api')
            .send({
                query: `mutation {
                          loginUser(username: "${user.username}", password: "randomPassword") {
                            id
                            first_name
                            last_name
                            email
                            username
                            access_token
                          }}`
            })
            .set("Accept", "application/json")
        const data = JSON.parse(res.toJSON().text)
        assert.equal(res.status, 200);
        assert.equal(data.data.loginUser.username, user.username)
    })

    it('tests unsuccessful user login',  async () => {
        const user = await generateUser()

        const res = await request
            .post('/api')
            .send({
                query: `mutation {
                          loginUser(username: "${user.username}", password: "randomPassword") {
                            id
                            first_name
                            last_name
                            email
                            username
                            access_token
                          }}`
            })
            .set("Accept", "application/json")
        const data = JSON.parse(res.toJSON().text)
        assert.equal(res.status, 200);
        assert.equal(data.errors[0].message, 'Incorrect password')
    })

    afterAll(async () => {
        await dbConnection.sync({force:true})
        await dbConnection.close()
    })
})
