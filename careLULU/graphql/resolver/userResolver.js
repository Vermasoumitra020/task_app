const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../dal/user')

/*
Basic user creation/registration api
- checks if the user exists
- creates the user if doesn't exists and returns the user
* */

const createUser = async args => {
    try{
        const existingUser = await User.findByUsername(args.userData.username)
        if(existingUser){
            throw new Error('User already exists.')
        }
        let {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password
        } = args.userData

        password = await bcrypt.hash(password, 12)
        const user = await User.create({first_name, last_name, email, username, password})
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.NODE_SECRET || 'He1CZ<^^eZ*TL(<',
            {
                expiresIn: '30d'
            }
        );
        return {...user.toJSON(), password: null, access_token: token}
    } catch (err){
        throw err
    }
}

const loginUser = async (args) =>{
    const {
        username,
        password
    } = args
    try{
        const user = await User.findByUsername(username)
        if(!user){
            throw new Error("Invalid username or password")
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.NODE_SECRET || 'He1CZ<^^eZ*TL(<',
            {
                expiresIn: '30d'
            }
        );
        return {...user.toJSON(), password: null, access_token: token}
    } catch(err){
        throw err
    }
}

const readUser =async (args, req) =>{
    if(!req || !req.user) {
        throw new Error("Unauthorized")
    }

    try {
        return req.user
    }catch (err) {
        throw err
    }
}


module.exports = {
    createUser,
    readUser,
    loginUser
}
