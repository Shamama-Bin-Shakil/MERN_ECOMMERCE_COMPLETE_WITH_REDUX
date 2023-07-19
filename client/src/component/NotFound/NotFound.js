import React from "react";
import WarningIcon from "@material-ui/icons/Warning";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="notFound">
      <WarningIcon />
      <Typography>Not Found Page Click Below Link</Typography>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
