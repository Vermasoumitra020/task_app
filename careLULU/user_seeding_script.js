const bcrypt = require('bcrypt')

export default {
    up: async (queryInterface) => queryInterface.bulkInsert('User', [
        {
            first_name: 'Austin',
            last_name: 'Tenny',
            username: 'Austin66',
            email: 'tenny.austin@example.com',
            password: await bcrypt.hash('admin', 12)
        },
        {
            first_name: 'Norman',
            last_name: 'Loxley',
            username: 'Norman23',
            email: 'loxley.norman@example.com',
            password: await bcrypt.hash('admin', 12)
        },
    ], {})
}
