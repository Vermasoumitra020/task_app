import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const getAccessToken = () => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['access_token'] : '';
    return `Bearer ${token}`;
}

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/api/',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token,
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

