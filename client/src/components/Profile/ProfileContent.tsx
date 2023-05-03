import Address from "./Address";
import Account from "./Account";
import { Routes, Route } from "react-router-dom";
import PreventWrongUrlAccess from "../PrivateRoutes/PreventWrongUrlAccess";

const ProfileContent = () => {
  return (
    <>
      <Routes>
        <Route
          path="/:name"
          element={
            <PreventWrongUrlAccess>
              <Account />
            </PreventWrongUrlAccess>
          }
        />

        <Route
          path="/:name/address"
          element={
            <PreventWrongUrlAccess>
              <Address />
            </PreventWrongUrlAccess>
          }
        />
      </Routes>
    </>
  );
};

export default ProfileContent;
