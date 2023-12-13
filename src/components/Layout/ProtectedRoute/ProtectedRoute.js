import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../../../context/AuthContext";

const protectedRoute = ({ component: Component, ...rest }) => {
  console.log("ProtectedRoute,", rest);  
  return (
    <AuthConsumer>
      {({ isAuthenticated }) => (
        <Route
          render={props =>
            isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
          {...rest}
        />
      )}
    </AuthConsumer>
  );
};

export default protectedRoute;
