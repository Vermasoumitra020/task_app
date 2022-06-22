const sequelize = require('../config/database')
const logger = require('../config/logger')
const assert = require('assert')
const {app} = require('../app')
const {generateUser, generateTasks} = require("./db");

const request = require('supertest')(app)


describe('Initial Task Test', () => {
    let dbConnection = sequelize
    let testUser

    beforeAll(async () => {
        dbConnection = await dbConnection.sync({force:true})
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
        testUser = data.data.createUser;
    })


    it('tests successful task creation',  async () => {
        const res = await request
            .post('/api')
            .send({
                query: `mutation {
                          createTask(taskData:{
                            description: "This is test task",
                            priority: "2"
                          }) {
                            id
                            description
                            priority
                            is_completed
                            created_at
                            updated_at
                          }
                        }`
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${testUser.access_token}`)
        const data = JSON.parse(res.toJSON().text)
        assert.equal(res.status, 200);
        assert.equal(data.data.createTask.description, "This is test task")
    })

    it('tests successful task list',  async () => {
        const res = await request
            .post('/api')
            .send({
                query: `query {
                          listTasks(taskData: {
                              limit: 3
                              from: 0
                          }){ data {
                            id
                            description
                            priority
                            is_completed
                            created_at
                            updated_at
                          } 
                          pageInfo {
                              pages
                              hasNext
                              currPage
                          }}}`
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${testUser.access_token}`)
        const data = JSON.parse(res.toJSON().text)
        assert.equal(res.status, 200);
        assert.equal(typeof data.data.listTasks.data, 'object')
        assert.equal(data.data.listTasks.data.length, 1)
    })


    it('tests successful task update',  async () => {
        const res = await request
            .post('/api')
            .send({
                query: `mutation {
                          updateTask(taskData: {
                            id: 1,
                            description: "This is new updated test task"
                          }) {
                            id
                            description
                            priority
                            is_completed
                            created_at
                            updated_at
                          }
                        }`
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${testUser.access_token}`)
        const data = JSON.parse(res.toJSON().text)
        assert.equal(res.status, 200);
        assert.equal(data.data.updateTask.description, "This is new updated test task")
    })

    afterAll(async () => {
        await dbConnection.sync({force:true})
        await dbConnection.close()
    })
})
