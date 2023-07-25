import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  airingTodayTvShows,
  onTheAirTvShows,
  popularTvShows,
  topRatedTvShows,
} from "../api/tvShowsApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getParams } from "../slices/searchSlice";

const Tvshowsscreen = () => {
  const dispatch = useDispatch();
  const [airToday, setAirToday] = useState([]);
  const [airThisWeek, setAirThisWeek] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    airingTodayTvShows().then((res) => setAirToday(res));
    onTheAirTvShows().then((res) => setAirThisWeek(res));
    popularTvShows().then((res) => setPopular(res));
    topRatedTvShows().then((res) => setTopRated(res));
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
      <Hero type={"tv"} />
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            tv shows airing today
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/tv/airing_today"
            onClick={() => {
              getSearchQuery("TV", "Airing Today");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {airToday &&
            airToday.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("tv-show") === true
                      ? "tv"
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
                    {data.title || data.name}
                  </p>
                </Link>
              );
            })}
        </div>
      </section>
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            tv shows airing this week
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/tv/on_the_air"
            onClick={() => {
              getSearchQuery("TV", "Airing This Week");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {airThisWeek &&
            airThisWeek.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("/tv-show") === true
                      ? "tv"
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
                    {data.title || data.name}
                  </p>
                </Link>
              );
            })}
        </div>
      </section>
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            popular tv shows
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/tv/popular"
            onClick={() => {
              getSearchQuery("TV", "Popular Shows");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {popular &&
            popular.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("tv-show") === true
                      ? "tv"
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
                    {data.original_title || data.name}
                  </p>
                </Link>
              );
            })}
        </div>
      </section>
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            top rated tv shows
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/entertainx/all/tv/top_rated"
            onClick={() => {
              getSearchQuery("TV", "Top Rated Shows");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {topRated &&
            topRated.map((data, index) => {
              return (
                <Link
                  className="relative popularCards"
                  key={index}
                  to={`/entertainx/details/${
                    data.media_type
                      ? data.media_type
                      : location.pathname.includes("tv-show") === true
                      ? "tv"
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
                    {data.title || data.name}
                  </p>
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Tvshowsscreen;
