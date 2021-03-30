import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withUser } from "./Auth/withUser";

const ProtectedRoute = ({ component: Component, context,protectionLevel, ...rest }) => {
  if (context.isLoading) {
    return null;
  } else if (context.isLoggedIn) {
    if (protectionLevel === "volunteer" || context.user.isAdmin) {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
      return <Redirect to="/new-visit" />;
    }
  } else {
    return <Redirect to="/" />;
  }
};

export default withUser(ProtectedRoute);