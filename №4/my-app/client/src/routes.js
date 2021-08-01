import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from './components/HomePage'
import {LoginPage} from './components/LoginPage'
import {RegisterPage} from './components/RegisterPage'

export const useRoutes = ({isAuthenticated}) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path='/home' exact>
                    <HomePage/>
                </Route>
                <Redirect to='/home'/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/login' exact>
                    <LoginPage/>
            </Route>
            <Route path='/register' exact>
                    <RegisterPage/>
            </Route>
            <Redirect to='/register'/>    
        </Switch>
    )
}