import React from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "services/authStore";

export const ProtectedRoute = ({ component, ...rest }: any) => {
  const Component = component;
  console.log('ProtectedRoute', auth.isAuth());
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuth()) {
          return <Component {...props} />;
        } else {

          return (
            <Redirect to={
                {
                  pathname: "/auth",
                  state: {from: props.location}
                }
              } 
            />
          )
        }
      }}
    />
  )
}
