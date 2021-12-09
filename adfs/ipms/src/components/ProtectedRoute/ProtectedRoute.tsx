import { useAuth } from "context/AuthContext";
import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component, ...rest }: any) => {
  const { isAuth } = useAuth();
  const Component = component;
  console.log('ProtectedRoute', isAuth);

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
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
