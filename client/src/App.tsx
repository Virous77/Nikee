import { Suspense } from "react";
import Navbar from "./layouts/Navbar";
import AppRouter from "./Router/AppRouter";
import ShowSearch from "./components/search/ShowSearch";
import Notification from "./components/UI/Notification";
import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";
import CartNotification from "./components/UI/CartNotification";

const App = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <ShowSearch />
      <div style={{ position: "relative" }}>
        {pathname !== "/checkout" && <Navbar />}
        <CartNotification />
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <AppRouter />
      </Suspense>

      {/* <Footer /> */}
      <Notification />
    </main>
  );
};

export default App;
