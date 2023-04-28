import Navbar from "./layouts/Navbar";
import AppRouter from "./Router/AppRouter";
import ShowSearch from "./components/search/ShowSearch";

const App = () => {
  return (
    <main>
      <ShowSearch />
      <Navbar />
      <AppRouter />
    </main>
  );
};

export default App;
