import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({component: Component, ...rest}) => {
  const auth = useSelector(state => state.firebase.auth);
  
  return (
      <>
        {auth.isLoaded &&
        <Route {...rest} render={
             props => {
                if (auth.uid) {
                    return <Component {...rest} {...props} />
                 } else {
                    return <Redirect to={{
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }} />
                    }}
            }
        />}
    </>
  )
}

export default ProtectedRoute;