const User = require('../models/user')

const create = async ({first_name, last_name, email, password, username}) =>{
    console.log(first_name, last_name, email, password, username)
    const user = await User.create({
        first_name: first_name,
        last_name:last_name,
        email:email,
        password:password,
        username:username
    })
    return user;
}

module.exports = {
    create
}
