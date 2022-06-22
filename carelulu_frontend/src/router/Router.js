import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import TaskScreen from "../screens/TaskScreen";
import AuthRoute from "./AuthRoute";


function Router(props) {
    return (
        <Switch>
            <AuthRoute exact path='/' >
                <Redirect to='/tasks' />
            </AuthRoute>

            <Route path='/login'>
                <LoginScreen />
            </Route>

            <Route path='/signup'>
                <SignupScreen />
            </Route>

            <AuthRoute path='/tasks'>
                <TaskScreen />
            </AuthRoute>

        </Switch>
    );
}

export default Router;
