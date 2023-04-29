import Navbar from "./layouts/Navbar";
import AppRouter from "./Router/AppRouter";
import ShowSearch from "./components/search/ShowSearch";
import Notification from "./components/UI/Notification";

const App = () => {
  return (
    <main>
      <ShowSearch />
      <Navbar />
      <AppRouter />
      <Notification />
    </main>
  );
};

export default App;
