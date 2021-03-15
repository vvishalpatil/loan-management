import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRouteUser({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.reqData !== undefined) {
          const { type } = JSON.parse(atob(localStorage.reqData));
          if (type === "User") {
            return <Component {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
