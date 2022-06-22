import { gql } from '@apollo/client';


export const USER_QUERIES = {
    userLogin: gql`
        mutation loginUser($username: String!, $password: String!) {
            loginUser(username: $username, password: $password) {
                id
                first_name
                last_name
                email
                username
                access_token
            }
        }
    `,

    userRegister: gql`
        mutation createUser($userData: UserData!) {
            createUser(userData: $userData) {
                id
                first_name
                last_name
                email
                username
                access_token
            }
        }
    `
};
