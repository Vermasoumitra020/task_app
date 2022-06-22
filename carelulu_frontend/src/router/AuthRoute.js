import React, {useContext} from 'react';
import AuthContext from "../store/auth-context";
import {Redirect, Route} from "react-router-dom";

function AuthRoute({ children, ...rest }) {
    const authContext = useContext(AuthContext);

    return (
        <Route {...rest}>
            {authContext.user ?
                (children) :
                (<Redirect to='/login' />)}
        </Route>
    );
}

export default AuthRoute;
