import React, { useEffect, useState } from "react";
import { BsCloudDownloadFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  searchResult,
  searchResultByGenre,
  searchResultOfPeopleMoviesCredit,
  searchResultOfPeopleShowsCredit,
  searchResultOfQury,
} from "../api/searchDetailsApi";
import "./styles/searchResults.scss";
import { getQuery } from "../slices/detailsTagSlice";
import Loader from "../components/Loader";
import { getSimilars } from "../api/movieTvDetailsApi";
const initialResult = [];
const SearchResultScreen = () => {
  const heading = useSelector((state) => state.search.value);
  const detailsQuery = useSelector((state) => state.detailsQuery.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const [results, setResults] = useState(initialResult);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let { type } = useParams();
  let { filter } = useParams();
  let { genre } = useParams();
  let { query } = useParams();
  let { sub } = useParams();
  let { personId } = useParams();
  let { movieId } = useParams();
  useEffect(() => {
    dispatch(getQuery(type));
    const getData = async () => {
      setLoading(true);
      if (sub) {
        await searchResult(type, filter, page, sub).then((res) =>
          setResults(res)
        );
      } else if (location.pathname.includes("person-movie") && personId) {
        await searchResultOfPeopleMoviesCredit(personId, page).then((res) =>
          setResults(res)
        );
      } else if (location.pathname.includes("person-tvshows") && personId) {
        await searchResultOfPeopleShowsCredit(personId).then((res) =>
          res.cast ? setResults(res.cast) : setResults(res.crew)
        );
      } else if (movieId) {
        await getSimilars(movieId, "movie").then((res) => setResults(res));
      } else if (query) {
        await searchResultOfQury(query, page).then((res) => setResults(res));
      } else if (genre) {
        await searchResultByGenre(type, genre, page).then((res) =>
          setResults(res)
        );
      } else {
        await searchResult(type, filter, page).then((res) => setResults(res));
      }
      setLoading(false);
    };
    getData();
  }, [location.pathname]);
  useEffect(() => {
    dispatch(getQuery(type));
    const getData = async () => {
      if (sub) {
        searchResult(type, filter, page, sub).then((res) =>
          setResults([...results, ...res])
        );
      } else if (movieId) {
        await getSimilars(movieId, "movie").then((res) =>
          setResults([...results, ...res])
        );
      } else if (query) {
        await searchResultOfQury(query, page).then((res) =>
          setResults([...results, ...res])
        );
      } else if (location.pathname.includes("person-movie") && personId) {
        await searchResultOfPeopleMoviesCredit(personId, page).then((res) =>
          setResults([...results, ...res])
        );
      } else if (genre) {
        searchResultByGenre(type, genre, page).then((res) =>
          setResults([...results, ...res])
        );
      } else {
        searchResult(type, filter, page).then((res) =>
          setResults([...results, ...res])
        );
      }
    };
    getData();
  }, [page]);
  const loadData = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };
  return (
    <>
      <main className="mt-[8vw] mx-4 sm:mx-12 mainSearchContainer my-4">
        {query ? (
          <h1 className="text-lg sm:text-3xl text-center">
            Showing results of "{query}"
          </h1>
        ) : (
          <h1 className="text-lg sm:text-3xl text-center">
            Showing "{heading.sndParam}" in {heading.fstParam}
          </h1>
        )}

        {loading ? (
          <Loader loadFor={"results"} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 my-4">
            {results.length > 0 &&
              results.map((elem, index) => {
                if (
                  elem.poster_path ||
                  elem.backdrop_path ||
                  elem.profile_path
                ) {
                  return (
                    <Link
                      className="relative cursor-pointer h-full resultsCards"
                      key={index}
                      to={`/entertainx/details/${
                        elem.media_type ||
                        detailsQuery ||
                        (location.pathname.includes("person-tvshows")
                          ? "tv"
                          : "movie")
                      }/${elem.id}`}
                    >
                      <div>
                        <img
                          src={
                            import.meta.env.VITE_BASE_IMAGE_URL +
                            "/original/" +
                            (elem.profile_path ||
                              elem.poster_path ||
                              elem.backdrop_path)
                          }
                          alt=""
                          className="w-[45vw] sm:w-[30vw]"
                        />
                      </div>
                      <div className="sm:absolute bottom-0 text-white flex-col gap-4 bg-[#00000060] sm:h-[25vw] p-2">
                        <h1 className="text-lg sm:text-3xl capitalize">
                          {elem.original_title || elem.title || elem.name}
                        </h1>
                        {elem.overview && (
                          <p className="hidden sm:block text-sm sm:text-lg">
                            {elem.overview.slice(0, 150)}...
                          </p>
                        )}
                        <p className="hidden sm:block text-sm sm:text-lg">
                          {elem.release_date || elem.known_for_department}
                        </p>
                        {elem.vote_average && (
                          <p className="text-sm sm:text-lg capitalize">
                            rating: {Math.floor(elem.vote_average)}/10
                          </p>
                        )}
                        {elem.popularity && (
                          <p className="hidden sm:block text-lg capitalize">
                            popularity: {Math.floor(elem.popularity)}
                          </p>
                        )}
                        {window.innerWidth > 640 && (
                          <div className="flex flex-wrap gap-4">
                            {elem.known_for &&
                              elem.known_for.length > 0 &&
                              elem.known_for.map((e, i) => (
                                <div key={i} className="w-[25%]">
                                  <img
                                    src={
                                      import.meta.env.VITE_BASE_IMAGE_URL +
                                      "/w300/" +
                                      (e.profile_path ||
                                        e.poster_path ||
                                        e.backdrop_path)
                                    }
                                    alt=""
                                    className="w-[5vw]"
                                  />
                                  <h1 className="sm:w-[40]">
                                    {e.title ||
                                      e.original_title?.slice(0, 30) + "..."}
                                  </h1>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                }
              })}
          </div>
        )}
        {!location.pathname.includes("person-tvshows") && (
          <div className="flex items-center justify-center">
            <button
              className="flex items-center sm:text-2xl gap-[5px] capitalize border-[2px] rounded-lg border-black px-4 py-2 dark:border-white text-xs whitespace-nowrap "
              type="button"
              onClick={loadData}
            >
              <BsCloudDownloadFill /> load more
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default SearchResultScreen;
