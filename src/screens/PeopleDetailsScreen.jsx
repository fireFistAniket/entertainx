import React, { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import {
  getPeopleDetails,
  getPeopleImages,
  getPeopleMovies,
  getPeopleShows,
} from "../api/peopleApi";
import { Link, useParams } from "react-router-dom";
import { FaBirthdayCake, FaHome } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import { getParams } from "../slices/searchSlice";
import { useDispatch } from "react-redux";

const PeopleDetailsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({});
  const [images, setImages] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState({});
  const { peopleId } = useParams();
  const dispatch = useDispatch();
  const photoSliderRef = useRef();
  useEffect(() => {
    const getPageDetails = async () => {
      setLoading(true);
      await getPeopleDetails(peopleId).then((res) => setPageData(res));
      await getPeopleImages(peopleId).then((res) => setImages(res));
      await getPeopleMovies(peopleId).then((res) => setMovies(res));
      await getPeopleShows(peopleId).then((res) =>
        res.cast ? setShows(res.cast) : setShows(res.crew)
      );
      setLoading(false);
    };
    getPageDetails();
  }, []);
  useEffect(() => {
    setPageData({});
    setImages([]);
    setMovies([]);
    setShows({});
  }, [!location.pathname]);

  useEffect(() => {
    let currentIndex = 0;
    const slidr = setInterval(() => {
      photoSliderRef.current.childNodes[
        currentIndex
      ].style.transform = `translateX(0%)`;
      photoSliderRef.current.childNodes.forEach((elem) => {
        if (photoSliderRef.current.childNodes[currentIndex] !== elem) {
          elem.style.transform = `translateX(100%)`;
        }
      });
      if (currentIndex === photoSliderRef.current.childNodes.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
    }, 3000);
    return () => {
      clearInterval(slidr);
    };
  }, [loading !== true]);
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
      {loading ? (
        <Loader loadFor={"people"} />
      ) : (
        <main>
          {pageData && (
            <div className="relative h-full">
              <div
                className="relative h-[90vw] sm:h-[45vw] flex overflow-hidden w-full"
                ref={photoSliderRef}
              >
                {images &&
                  images
                    .slice(0, 1)
                    .map((item, index) => (
                      <img
                        src={
                          import.meta.env.VITE_BASE_IMAGE_URL +
                          "/original/" +
                          item.file_path
                        }
                        key={index}
                        alt=""
                        className="absolute bottom-0 right-0 w-full h-[90vw] sm:h-[45vw] object-cover object-center transition-transform ease-linear duration-500 translate-x-0"
                      />
                    ))}
                {images &&
                  images
                    .slice(1, 2)
                    .map((item, index) => (
                      <img
                        src={
                          import.meta.env.VITE_BASE_IMAGE_URL +
                          "/original/" +
                          item.file_path
                        }
                        key={index}
                        alt=""
                        className="absolute bottom-0 left-0 w-full h-[90vw] sm:h-[45vw] object-cover object-top transition-transform ease-linear duration-500 translate-x-0"
                      />
                    ))}
              </div>
              <div className="absolute bottom-0 flex items-start justify-start px-4 py-2 sm:px-12 sm:py-4 bg-[#00000055] w-full">
                <div className="flex justify-start">
                  <img
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL +
                      "/original" +
                      pageData.profile_path
                    }
                    alt=""
                    className="mr-0 w-[100vw] sm:w-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-4 px-4 sm:px-12 text-white">
                  <h1 className="text-xl sm:text-3xl capitalize">
                    {pageData.name}
                  </h1>
                  <p className="text-sm sm:text-lg">
                    {window.innerWidth > 640
                      ? pageData.biography?.slice(0, 900)
                      : pageData.biography?.slice(0, 150) + "..."}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-[3.5px] text-sm sm:text-xl">
                      <FaHome />
                      {pageData.place_of_birth}
                    </div>
                    <div className="flex items-center gap-[3.5px] text-sm sm:text-xl capitalize">
                      <FaBirthdayCake />
                      {pageData.birthday}
                    </div>
                    <div className="flex items-center gap-[3.5px] text-sm sm:text-xl">
                      <p className="capitalize">
                        known for {pageData.known_for_department}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {images && images.length > 0 && (
            <div className="mx-4 my-2 sm:my-4 sm:mx-12">
              <h1 className="text-lg sm:text-4xl my-4 capitalize font-semibold">
                gallery
              </h1>
              <div className="flex flex-wrap gap-4 items-center justify-evenly sm:justify-start">
                {images.slice(0, 15).map(
                  (item, index) =>
                    item.file_path && (
                      <div>
                        <img
                          src={
                            import.meta.env.VITE_BASE_IMAGE_URL +
                            "/original/" +
                            item.file_path
                          }
                          alt=""
                          className="w-[30vw] sm:w-[20vw]  rounded-lg shadow-xl"
                          key={index}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          )}
          {movies && movies.length > 0 && (
            <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
              <div className="flex justify-between">
                <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                  movies list
                </h1>
                <Link
                  className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
                  to={`/search/person-movie/${peopleId}`}
                  onClick={() => {
                    getSearchQuery("Movies", pageData.name);
                  }}
                >
                  view more <LuMoreHorizontal />
                </Link>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                {movies.slice(0, 6).map(
                  (data, index) =>
                    (data.poster_path || data.backdrop_path) && (
                      <Link
                        className="relative popularCards"
                        key={index}
                        to={`/details/movie/${data.id}`}
                      >
                        <img
                          src={
                            import.meta.env.VITE_BASE_IMAGE_URL +
                            "/w300/" +
                            (data.poster_path || data.backdrop_path)
                          }
                          alt=""
                          className="w-40 sm:w-60"
                        />
                        <p className="text-sm sm:text-lg capitalize absolute bottom-0 bg-[#ffffffbf] w-full py-2 text-center font-medium dark:bg-[#29282883] dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)] dark:backdrop-blur-[3px]">
                          {data.title || data.original_title || data.name}
                        </p>
                      </Link>
                    )
                )}
              </div>
            </section>
          )}
          {shows && shows.length > 0 && (
            <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
              <div className="flex justify-between">
                <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                  tv series list
                </h1>
                <Link
                  className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
                  to={`/search/person-tvshows/${peopleId}`}
                  onClick={() => {
                    getSearchQuery("TV Shows", pageData.name);
                  }}
                >
                  view more <LuMoreHorizontal />
                </Link>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                {shows.slice(0, 6).map(
                  (data, index) =>
                    (data.poster_path || data.backdrop_path) && (
                      <Link
                        className="relative popularCards"
                        key={index}
                        to={`/details/tv/${data.id}`}
                      >
                        <img
                          src={
                            import.meta.env.VITE_BASE_IMAGE_URL +
                            "/w300/" +
                            (data.poster_path || data.backdrop_path)
                          }
                          alt=""
                          className="w-40 sm:w-60"
                        />
                        <p className="text-sm sm:text-lg capitalize absolute bottom-0 bg-[#ffffffbf] w-full py-2 text-center font-medium dark:bg-[#29282883] dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)] dark:backdrop-blur-[3px]">
                          {data.title || data.original_title || data.name}
                        </p>
                      </Link>
                    )
                )}
              </div>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default PeopleDetailsScreen;
