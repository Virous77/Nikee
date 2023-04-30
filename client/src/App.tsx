import Navbar from "./layouts/Navbar";
import AppRouter from "./Router/AppRouter";
import ShowSearch from "./components/search/ShowSearch";
import Notification from "./components/UI/Notification";
import Footer from "./layouts/Footer";

const App = () => {
  return (
    <main>
      <ShowSearch />
      <Navbar />
      <AppRouter />
      <Footer />
      <Notification />
    </main>
  );
};

export default App;
