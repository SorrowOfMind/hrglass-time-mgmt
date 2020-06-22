import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from './components/layout/Main';
import SignUpForm from './components/auth/SignUpForm';
import LogInForm from './components/auth/LogInForm';
import Workspace from './components/layout/Workspace';
import NotFound from './components/layout/NotFound';
import ProtectedRoute from './ProtectedRoute';


const Routes = () => {
    return (
        <Switch>
           <Route exact path='/' component={Main}/>
           <Route path='/signup' component={SignUpForm}/>
           <Route path='/login' component={LogInForm}/>
           <ProtectedRoute path='/workspace' component={Workspace}/>
           <Route path='*' component={NotFound}/>
       </Switch>
    )
}

export default Routes;