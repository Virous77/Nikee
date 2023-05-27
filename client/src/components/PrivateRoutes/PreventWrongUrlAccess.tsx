import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";

const PreventWrongUrlAccess = ({ children }: { children: React.ReactNode }) => {
  const { UserData } = useAuthContext();
  const { pathname } = useLocation();
  const makeUserName = UserData?.name.split(" ").join("-");

  if (!makeUserName) return <p></p>;

  if (
    pathname === `/profile/${makeUserName}` ||
    pathname === `/profile/address/${makeUserName}` ||
    pathname === `/profile/orders/${makeUserName}` ||
    pathname === `/profile/fav/${makeUserName}` ||
    pathname === `/profile/settings/${makeUserName}`
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/error"} />;
  }
};

export default PreventWrongUrlAccess;
