import Profile from "../components/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import UserAddress from "./UserAddress";
import PreventWrongUrlAccess from "../components/PrivateRoutes/PreventWrongUrlAccess";

const ProfilePage = () => {
  return (
    <>
      <Routes>
        <Route
          path="/:name"
          element={
            <PreventWrongUrlAccess>
              <Profile />
            </PreventWrongUrlAccess>
          }
        />
        <Route path="/:name/address" element={<UserAddress />} />
      </Routes>
    </>
  );
};

export default ProfilePage;
