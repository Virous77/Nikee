import { Suspense } from "react";
import Navbar from "./layouts/Navbar";
import AppRouter from "./Router/AppRouter";
import ShowSearch from "./components/search/ShowSearch";
import Notification from "./components/UI/Notification";
import Footer from "./layouts/Footer";
import { useLocation } from "react-router-dom";

const App = () => {
  const { pathname } = useLocation();
  return (
    <main>
      <ShowSearch />
      {pathname !== "/checkout" && <Navbar />}
      <Suspense fallback={<p>Loading...</p>}>
        <AppRouter />
      </Suspense>

      {/* <Footer /> */}
      <Notification />
    </main>
  );
};

export default App;
