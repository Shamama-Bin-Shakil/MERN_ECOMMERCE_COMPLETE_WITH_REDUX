import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest}) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading === false &&
        (isAuthenticated === false ? <Navigate to="/auth" /> : <Outlet />)}
    </Fragment>
  );
};

export default ProtectedRoute;
