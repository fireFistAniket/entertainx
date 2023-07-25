import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import warnerBros from "../assets/Warner Bros. Pictures Animation.png";
import universal from "../assets/Universal Pictures.png";
import paramount from "../assets/Paramount Television Studios.png";
import disney from "../assets/Walt Disney Pictures.png";
import sony from "../assets/Sony Pictures Home Entertainment.png";
import { useDispatch } from "react-redux";
import { getParams } from "../slices/searchSlice";
import { LuMoreHorizontal } from "react-icons/lu";
import "./styles/homescreen.scss";
import { trendingAll, trendingChracters } from "../api/homeApi";
import Loader from "../components/Loader";

const Homescreen = () => {
  const dispatch = useDispatch();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chracters, setChracters] = useState([]);
  useEffect(() => {
    const trendingMoviesTvShows = async () => {
      setLoading(true);
      await trendingAll().then((data) => {
        setTrending(data);
      });
      setLoading(false);
    };
    const trendingPeople = async () => {
      setLoading(true);
      await trendingChracters().then((data) => {
        setChracters(data);
      });
      setLoading(false);
    };
    trendingMoviesTvShows();
    trendingPeople();
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
      <Hero type={"all"} />
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            what's trending right now
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/all/trending/all/week"
            onClick={() => {
              getSearchQuery("All", "Trending");
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
                  to={`/details/${data.media_type}/${data.id}`}
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
            })
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            Show's of your favourite chracter
          </h2>
          <Link
            className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
            to="/all/trending/person/week"
            onClick={() => {
              getSearchQuery("Persons", "Trending");
            }}
          >
            view more <LuMoreHorizontal />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {loading ? (
            <Loader loadFor={"searched people"} />
          ) : (
            chracters &&
            chracters.map((data, index) => {
              if (data.profile_path !== null) {
                return (
                  <Link
                    className="relative popularCards"
                    key={index}
                    to={`/details/person/${data.id}`}
                  >
                    <img
                      src={
                        import.meta.env.VITE_BASE_IMAGE_URL +
                        "/w500/" +
                        data.profile_path
                      }
                      alt=""
                      className="w-40 sm:w-60"
                    />
                    <p className="text-sm sm:text-lg capitalize absolute bottom-0 bg-[#ffffffbf] w-full py-2 text-center font-medium dark:bg-[#29282883] dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)] dark:backdrop-blur-[3px]">
                      {data.original_title || data.name}
                    </p>
                  </Link>
                );
              }
            })
          )}
        </div>
      </section>
      <section className="my-4 mx-12">
        <div className="overflow-hidden">
          <h2 className="text-lg sm:text-4xl capitalize font-semibold">
            top production companies
          </h2>
          <div className="flex items-center justify-between productionCompanies">
            <img
              src={warnerBros}
              alt=""
              className="w-24 sm:w-48"
              title="warner bros. picture"
            />
            <img
              src={universal}
              alt=""
              className="w-24 sm:w-48"
              title="universal studios"
            />
            <img
              src={paramount}
              alt=""
              className="w-24 sm:w-48"
              title="paramount pictures"
            />
            <img src={disney} alt="" className="w-24" title="walt disney" />
            <img
              src={sony}
              alt=""
              className="w-24 sm:w-48"
              title="sony entertainment"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Homescreen;
