import Address from "./Address";
import Account from "./Account";
import { Routes, Route } from "react-router-dom";
import PreventWrongUrlAccess from "../PrivateRoutes/PreventWrongUrlAccess";
import OrderPage from "../MyOrder/Order";
import Fav from "../FavProducts/Fav";

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

        <Route
          path="/fav/:name"
          element={
            <PreventWrongUrlAccess>
              <Fav />
            </PreventWrongUrlAccess>
          }
        />
      </Routes>
    </>
  );
};

export default ProfileContent;
