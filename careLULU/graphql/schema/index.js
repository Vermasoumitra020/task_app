const { buildSchema } = require('graphql')

// graphql apis
const schema = buildSchema(`
    type User {
        id: Int
        first_name: String
        last_name: String
        email: String
        username: String
        access_token: String
    }
    
    type Task {
        id: Int
        description: String
        is_completed: Boolean
        priority: String
        created_at: String
        updated_at: String
    }
    
    type PageInfo {
        count: Int,
        pages: Int,
        hasNext: Boolean,
        currPage: Int
    }
    
    type PaginatedTasks {
        data: [Task]
        pageInfo: PageInfo
    }
    
    input UserData {
        first_name: String
        last_name: String
        email: String!
        username: String!
        password: String!
    }
    
    input TaskData {
        id: Int
        description: String
        is_completed: Boolean
        priority: String
        sort: String
        order: String
        limit: Int
        from: Int
    }
    
    
    type RootQuery {
        readUser: User
        listTasks(taskData: TaskData): PaginatedTasks
    }
    
    type RootMutation {
        createUser(userData: UserData): User
        loginUser(username: String!, password: String!): User 
        createTask(taskData: TaskData): Task
        updateTask(taskData: TaskData): Task
        deleteTask(id: Int): Task
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

module.exports = schema
