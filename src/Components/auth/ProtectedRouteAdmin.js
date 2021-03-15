import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRouteAdmin({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.reqData !== undefined) {
          const { type } = JSON.parse(atob(localStorage.reqData));
          if (type === "Admin") {
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
