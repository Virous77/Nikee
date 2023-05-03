import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalData } from "../../utils/data";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const user = getLocalData("nike");
  if (!user) return <Navigate to={"/login"} />;

  return children;
};

export default PrivateRoutes;
