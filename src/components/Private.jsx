/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "../Context";

const Private = ({ children }) => {
  const [user, setUser] = useGlobalState("user");
  if (user.name) {
    return children;
  } else return <Navigate to="/login" state="redirected"></Navigate>;
};

export default Private;
