import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { useDispatch } from "react-redux";
import { getParams } from "../slices/searchSlice";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  topRatedMovie,
  trendingAllMovie,
  upComingMovie,
} from "../api/movieApi";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Moviesscreen = () => {
  const dispatch = useDispatch();
  const [trending, setTrending] = useState([]);
  const [rated, setRated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upComing, setUpComing] = useState([]);
  useEffect(() => {
    const getPageData = async () => {
      setLoading(true);
      await trendingAllMovie().then((res) => setTrending(res));
      await topRatedMovie().then((res) => setRated(res));
      await upComingMovie().then((res) => setUpComing(res));
      setLoading(false);
    };
    getPageData();
  }, []);
  const getSearchQuery = (fstQuery, sndQuery) => {
    dispatch(
      getParams({
        fstParam: fstQuery,
        sndParam: sndQuery,
      })
    );
  };
  return (
    <>
      <Hero type={"movie"} />
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            what's trending movies right now
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/movie/popular"
            onClick={() => {
              getSearchQuery("Movies", "Popular");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {loading ? (
            <Loader loadFor={"trending movies"} />
          ) : (
            trending &&
            trending.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("movies") === true
                      ? "movie"
                      : null
                  }/${data.id}`}
                >
                  <img
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL +
                      "/w300/" +
                      data.poster_path
                    }
                    alt=""
                    className="w-40 sm:w-60"
                  />
                  <p className="text-sm sm:text-lg capitalize absolute bottom-0 bg-[#ffffffbf] w-full py-2 text-center font-medium dark:bg-[#29282883] dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)] dark:backdrop-blur-[3px]">
                  {data.name || data.title}
                  </p>
                </Link>
              );
            })
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            most rated movies for you
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/movie/top_rated"
            onClick={() => {
              getSearchQuery("Movies", "Top Rated");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {loading ? (
            <Loader loadFor={"most rated movies"} />
          ) : (
            rated &&
            rated.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("movies") === true
                      ? "movie"
                      : null
                  }/${data.id}`}
                >
                  <img
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL +
                      "/w300/" +
                      data.poster_path
                    }
                    alt=""
                    className="w-40 sm:w-60"
                  />
                  <p className="text-sm sm:text-lg capitalize absolute bottom-0 bg-[#ffffffbf] w-full py-2 text-center font-medium dark:bg-[#29282883] dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)] dark:backdrop-blur-[3px]">
                  {data.name || data.title}
                  </p>
                </Link>
              );
            })
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            upcoming movies
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/movie/upcoming"
            onClick={() => {
              getSearchQuery("Movies", "Upcoming");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {loading ? (
            <Loader loadFor={"upcoming movies"} />
          ) : (
            upComing &&
            upComing.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("movies") === true
                      ? "movie"
                      : null
                  }/${data.id}`}
                >
                  <img
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL +
                      "/w300/" +
                      data.poster_path
                    }
                    alt=""
                    className="w-40 sm:w-60"
                  />
                  <p className="text-sm sm:text-lg capitalize absolute bottom-0 bg-[#ffffffbf] w-full py-2 text-center font-medium dark:bg-[#29282883] dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)] dark:backdrop-blur-[3px]">
                    {data.name || data.title}
                  </p>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default Moviesscreen;
