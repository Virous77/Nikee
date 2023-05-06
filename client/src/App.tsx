// import Navbar from "./layouts/Navbar";
// import AppRouter from "./Router/AppRouter";
// import ShowSearch from "./components/search/ShowSearch";
// import Notification from "./components/UI/Notification";
// import Footer from "./layouts/Footer";
// import { useLocation } from "react-router-dom";
import Payment from "./components/payment/Payment";

const App = () => {
  // const { pathname } = useLocation();
  return (
    <main>
      {/* <ShowSearch />
      {pathname !== "/checkout" && <Navbar />}
      <AppRouter />
      <Footer />
      <Notification /> */}
      <Payment />
    </main>
  );
};

export default App;
