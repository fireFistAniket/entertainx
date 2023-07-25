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
        <Route path="/" element={<Homescreen />} />
        <Route path="/movies" element={<Moviesscreen />} />
        <Route path="/tv-shows" element={<Tvshowsscreen />} />
        <Route
          path="/all/:type/:filter/:sub?"
          element={<SearchResultScreen />}
        />
        <Route path="/all/similar/:movieId" element={<SearchResultScreen />} />
        <Route path="/genre/:type/:genre" element={<SearchResultScreen />} />
        <Route path="/search/:query" element={<SearchResultScreen />} />
        <Route
          path="/search/person-movie/:personId"
          element={<SearchResultScreen />}
        />
        <Route
          path="/search/person-tvshows/:personId"
          element={<SearchResultScreen />}
        />
        <Route
          path="/details/:mediaType/:id"
          element={<MovieTvDetailsScreen />}
        />
        <Route
          path="/details/season/:id/:seasonNumber"
          element={<TvSeasonDetails />}
        />
        <Route
          path="/details/person/:peopleId"
          element={<PeopleDetailsScreen />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
