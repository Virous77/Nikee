import Address from "./Address";
import Account from "./Account";
import { Routes, Route } from "react-router-dom";
import PreventWrongUrlAccess from "../PrivateRoutes/PreventWrongUrlAccess";
import OrderPage from "../MyOrder/Order";

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
          path="/address/:name"
          element={
            <PreventWrongUrlAccess>
              <Address />
            </PreventWrongUrlAccess>
          }
        />

        <Route
          path="/orders/:name"
          element={
            <PreventWrongUrlAccess>
              <OrderPage />
            </PreventWrongUrlAccess>
          }
        />
      </Routes>
    </>
  );
};

export default ProfileContent;
