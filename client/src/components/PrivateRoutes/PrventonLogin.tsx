import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalData } from "../../utils/data";

const PreventOnLogin = ({ children }: { children: React.ReactNode }) => {
  const user = getLocalData("nike");
  if (user) return <Navigate to={"/error"} />;

  return <>{children}</>;
};

export default PreventOnLogin;
