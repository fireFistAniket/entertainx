import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Footer from "./components/Footer";
import Moviesscreen from "./screens/Moviesscreen";
import Tvshowsscreen from "./screens/Tvshowsscreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import MovieTvDetailsScreen from "./screens/movieTvDetailsScreen";
import TvSeasonDetails from "./screens/TvSeasonDetailsScreen";
import PeopleDetailsScreen from "./screens/PeopleDetailsScreen";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/entertainx/" element={<Homescreen />} />
        <Route path="/entertainx/movies" element={<Moviesscreen />} />
        <Route path="/entertainx/tv-shows" element={<Tvshowsscreen />} />
        <Route
          path="/entertainx/all/:type/:filter/:sub?"
          element={<SearchResultScreen />}
        />
        <Route path="/entertainx/all/similar/:movieId" element={<SearchResultScreen />} />
        <Route path="/entertainx/genre/:type/:genre" element={<SearchResultScreen />} />
        <Route path="/entertainx/search/:query" element={<SearchResultScreen />} />
        <Route
          path="/entertainx/search/person-movie/:personId"
          element={<SearchResultScreen />}
        />
        <Route
          path="/entertainx/search/person-tvshows/:personId"
          element={<SearchResultScreen />}
        />
        <Route
          path="/entertainx/details/:mediaType/:id"
          element={<MovieTvDetailsScreen />}
        />
        <Route
          path="/entertainx/details/season/:id/:seasonNumber"
          element={<TvSeasonDetails />}
        />
        <Route
          path="/entertainx/details/person/:peopleId"
          element={<PeopleDetailsScreen />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
