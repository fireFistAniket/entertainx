import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoMdTimer } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { HiMiniLanguage } from "react-icons/hi2";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { LuMoreHorizontal } from "react-icons/lu";
import defaultDP from "../assets/defaultDP.png";
import defaultCompany from "../assets/defaultCompany.png";
import defaultPoster from "../assets/defaultSeriesOrCollection.png";
import {
  getCollection,
  getCredit,
  getDetails,
  getImage,
  getReview,
  getSimilars,
  getVideo,
} from "../api/movieTvDetailsApi";
import Loader from "../components/Loader";
import "./styles/movieTvDetailsScreen.scss";
import { getParams } from "../slices/searchSlice";
import { useDispatch } from "react-redux";

const MovieTvDetailsScreen = () => {
  const [pageData, setPageData] = useState({});
  const [videoes, setVideoes] = useState([]);
  const [casts, setCasts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCast, setShowCast] = useState(false);
  const [credits, setCredits] = useState({});
  const [reviews, setReviews] = useState([]);
  const [simailars, setSimailars] = useState([]);
  const [collection, setCollection] = useState({});
  const [pathName, setPathName] = useState("");
  const { mediaType } = useParams();
  const { id } = useParams();
  const dispatch = useDispatch();
  const photoSliderRef = useRef();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== pathName) {
      setPathName(location.pathname);
      setPageData({});
      setVideoes([]);
      setCasts([]);
      setImages([]);
      setCredits({});
      setReviews([]);
      setSimailars([]);
      setCollection({});
    }
    const getPageData = async () => {
      setLoading(true);
      let collectionId;
      await getDetails(id, mediaType).then((res) => {
        setPageData(res);
        if (
          res.belongs_to_collection !== null ||
          res.belongs_to_collection !== undefined
        ) {
          collectionId = res.belongs_to_collection?.id;
        }
      });
      await getVideo(id, mediaType).then((res) => setVideoes(res));
      await getCredit(id, mediaType).then((res) => setCasts(res.cast));
      await getImage(id, mediaType).then((res) => {
        setImages(res);
        console.log(res);
      });
      if (collectionId !== undefined) {
        await getCollection(collectionId).then((res) => setCollection(res));
      }
      await getCredit(id, mediaType).then((res) => setCredits(res));
      await getReview(id, mediaType).then((res) => setReviews(res));
      await getSimilars(id, mediaType).then((res) => setSimailars(res));
      setLoading(false);
    };
    getPageData();
  }, [location.pathname]);
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
        <Loader loadFor={"details"} />
      ) : (
        <main>
          {pageData && (
            <div className="relative h-full">
              <div
                className="relative h-[90vw] sm:h-[45vw] flex overflow-hidden w-[100%]"
                ref={photoSliderRef}
              >
                {pageData.backdrop_path && (
                  <img
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL +
                      "/original/" +
                      pageData.backdrop_path
                    }
                    alt=""
                    className="absolute bottom-0 right-0 w-full h-[90vw] sm:h-[45vw] object-cover object-top transition-transform ease-linear duration-500 translate-x-0"
                  />
                )}
                {pageData.poster_path && (
                  <img
                    src={
                      import.meta.env.VITE_BASE_IMAGE_URL +
                      "/original/" +
                      pageData.poster_path
                    }
                    alt=""
                    className="absolute bottom-0 left-0 w-full h-[90vw] sm:h-[45vw] object-cover z-0 object-top transition-transform ease-linear duration-500 translate-x-full"
                  />
                )}
              </div>
              <div className="absolute bottom-0 px-4 py-2 sm:px-12 sm:py-4 bg-[#00000055] w-full left-0">
                <div className="flex flex-col gap-1 sm:gap-4 sm:px-12 text-white">
                  <h1 className="text-xl sm:text-3xl capitalize">
                    {pageData.name || pageData.original_title}
                  </h1>
                  <p className="text-sm sm:text-lg sm:w-[60%]">
                    {window.innerWidth > 640
                      ? pageData.overview
                      : pageData.overview?.slice(0, 150) + "..."}
                  </p>
                  <div className="flex w-[55%] flex-wrap gap-1">
                    {casts &&
                      casts.slice(0, 10).map(
                        (elm, index) =>
                          elm.profile_path && (
                            <div
                              className="border-white border-[2px] border-solid rounded-full"
                              key={index}
                            >
                              <img
                                src={
                                  import.meta.env.VITE_BASE_IMAGE_URL +
                                  "/original/" +
                                  elm.profile_path
                                }
                                title={elm.name}
                                alt=""
                                className="w-[5vw] sm:w-[3vw] rounded-full h-[5vw] sm:h-[3vw] object-cover"
                              />
                            </div>
                          )
                      )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-[3.5px] text-sm sm:text-xl">
                      <p className="capitalize">
                        rating: {Math.floor(pageData.vote_average)}/10
                      </p>
                    </div>
                    {(pageData.runtime ||
                      (pageData.episode_run_time &&
                        pageData.episode_run_time.length > 0)) && (
                      <div className="flex items-center gap-[3.5px] text-sm sm:text-xl capitalize">
                        <IoMdTimer />
                        {pageData.runtime ||
                          (pageData.episode_run_time &&
                            pageData.episode_run_time[0])}{" "}
                        MIN
                      </div>
                    )}
                    <div className="flex items-center gap-[3.5px] text-sm sm:text-xl capitalize">
                      <SlCalender />
                      {pageData.release_date || pageData.first_air_date}
                    </div>
                    {(pageData.runtime ||
                      (pageData.spoken_languages &&
                        pageData.spoken_languages.length > 0)) && (
                      <div className="flex items-center gap-[3.5px] text-sm sm:text-xl capitalize">
                        <HiMiniLanguage />
                        {pageData.spoken_languages &&
                          pageData.spoken_languages.map((elem, index) => (
                            <p key={index}>{elem.english_name || elem.name}</p>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    {pageData.genres &&
                      pageData.genres.map((elm, index) => {
                        return (
                          <p
                            className="capitalize bg-black text-white px-2 py-1 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-lg"
                            key={index}
                          >
                            {elm.name}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {window.innerWidth > 640 && videoes && videoes.length > 0 && (
            <>
              <h1 className="text-lg sm:text-4xl capitalize font-semibold mx-4 my-2 sm:my-4 sm:mx-12">
                featurette
              </h1>
              <div className="flex flex-wrap gap-4 items-center mx-4 my-2 sm:my-4 sm:mx-12 justify-evenly">
                {videoes &&
                  videoes.slice(0, 12).map((data, index) => {
                    return (
                      <div className="" key={index}>
                        <iframe
                          className="w-[20vw] h-[10vw]"
                          src={`https://www.youtube.com/embed/${data.key}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {images && (
            <div className="mx-4 my-2 sm:my-4 sm:mx-12">
              <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                gallery
              </h1>
              <div className="flex flex-wrap gap-4 items-center justify-evenly sm:justify-start sm:mx-12 sm:my-6">
                {images.backdrops &&
                  images.backdrops
                    .slice(0, 5)
                    .map(
                      (item, index) =>
                        item.file_path && (
                          <img
                            src={
                              import.meta.env.VITE_BASE_IMAGE_URL +
                              "/original/" +
                              item.file_path
                            }
                            alt=""
                            className="w-[30vw] sm:w-[20vw] rounded-lg shadow-xl"
                            key={index}
                          />
                        )
                    )}
                {images.logos &&
                  images.logos
                    .slice(0, 5)
                    .map(
                      (item, index) =>
                        item.file_path && (
                          <img
                            src={
                              import.meta.env.VITE_BASE_IMAGE_URL +
                              "/original/" +
                              item.file_path
                            }
                            alt=""
                            className="w-[30vw] sm:w-[20vw] rounded-lg shadow-xl"
                            key={index}
                          />
                        )
                    )}
                {images.posters &&
                  images.posters
                    .slice(0, 5)
                    .map(
                      (item, index) =>
                        item.file_path && (
                          <img
                            src={
                              import.meta.env.VITE_BASE_IMAGE_URL +
                              "/original/" +
                              item.file_path
                            }
                            alt=""
                            className="w-[30vw] sm:w-[20vw] rounded-lg shadow-xl"
                            key={index}
                          />
                        )
                    )}
              </div>
            </div>
          )}
          {pageData.production_companies &&
            pageData.production_companies.length > 0 && (
              <div className="mx-4 my-2 sm:my-4 sm:mx-12 flex flex-col gap-6">
                <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                  production companies
                </h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-8 justify-evenly">
                  {pageData.production_companies.map((elem, index) => {
                    return (
                      <div
                        className="flex flex-col items-center gap-2 "
                        key={index}
                      >
                        <img
                          src={
                            elem.logo_path
                              ? import.meta.env.VITE_BASE_IMAGE_URL +
                                "/w300" +
                                elem.logo_path
                              : defaultCompany
                          }
                          alt=""
                          className="w-[15vw] dark:invert"
                        />
                        <h3 className="text-base sm:text-xl capitalize">
                          {elem.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          {Object.keys(collection).length > 0 && (
            <>
              <h1 className="mx-4 sm:mx-12 mt-2 sm:mt-6 text-xl sm:text-4xl capitalize font-semibold">
                movie collection
              </h1>
              <div className="mx-4 sm:mx-12">
                <h1 className="text-base sm:text-xl">{collection.name}</h1>
                <p className="text-sm sm:text-xl">{collection.overview}</p>
                <div className="flex flex-wrap items-center gap-4 justify-evenly my-6 hoverHide">
                  {collection.parts &&
                    collection.parts.map((item, index) => (
                      <Link
                        to={`/details/${item.media_type}/${item.id}`}
                        key={index}
                        className="flex flex-col relative"
                      >
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_BASE_IMAGE_URL +
                              "/original/" +
                              (item.poster_path || item.backdrop_path)
                            }
                            alt=""
                            className="w-[40vw] sm:w-[20vw]"
                          />
                        </div>
                        <div className="absolute bottom-0 bg-[#00000055] text-white flex flex-col gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 dark:bg-[#29282883] dark:backdrop-blur-[3px]">
                          <h3 className="text-sm sm:text-xl dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)]">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-lg dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)]">
                            {item.overview.slice(0, 70)}...
                          </p>
                          <div className="flex items-center">
                            {[
                              ...Array(
                                Math.ceil(item.vote_average)
                                  ? Math.ceil(item.vote_average)
                                  : 3
                              ),
                            ].map((x, i) => (
                              <AiFillStar color="yellow" key={i} />
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </>
          )}
          {pageData.seasons && pageData.seasons.length > 0 && (
            <div className="mx-4 sm:mx-12">
              <h1 className="mt-2 sm:mt-6 text-xl sm:text-4xl capitalize font-semibold">
                season collection
              </h1>
              <div className="flex flex-wrap items-center gap-4 justify-evenly my-6 hoverHide">
                {pageData.seasons &&
                  pageData.seasons.map((item, index) => (
                    <Link
                      to={`/details/season/${id}/${item.season_number}`}
                      key={index}
                      className="flex flex-col relative"
                    >
                      <div>
                        <img
                          src={
                            item.poster_path !== null &&
                            item.backdrop_path !== null
                              ? import.meta.env.VITE_BASE_IMAGE_URL +
                                "/original/" +
                                (item.poster_path || item.backdrop_path)
                              : defaultPoster
                          }
                          alt=""
                          className="w-[40vw] sm:w-[20vw]"
                        />
                      </div>
                      <div className="absolute bottom-0 bg-[#00000055] text-white flex flex-col gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 dark:bg-[#29282883] dark:backdrop-blur-[3px]">
                        <h3 className="text-sm sm:text-xl dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)]">
                          {item.title || item.name}
                        </h3>
                        <p className="text-xs sm:text-lg dark:[text-shadow:_0_4px_5px_rgb(0_0_0_/_65%)]">
                          {item.overview.slice(0, 70)}...
                        </p>
                        <div className="flex items-center">
                          {[
                            ...Array(
                              Math.ceil(item.vote_average)
                                ? Math.ceil((item.vote_average * 5) / 10)
                                : 3
                            ),
                          ].map((x, i) => (
                            <AiFillStar color="yellow" key={i} />
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
          {credits && (
            <>
              {credits.cast && credits.cast.length > 0 && (
                <div className="mx-4 my-2 sm:my-4 sm:mx-12 flex flex-col gap-6">
                  <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                    casting
                  </h1>
                  <div className="flex flex-wrap items-start justify-around gap-2 sm:gap-5">
                    {showCast === true
                      ? credits.cast.map((item, index) => {
                          return (
                            <Link
                              key={index}
                              className="w-[25vw] sm:w-auto"
                              to={`/details/person/${item.id}`}
                            >
                              <img
                                src={
                                  item.profile_path !== null
                                    ? import.meta.env.VITE_BASE_IMAGE_URL +
                                      "/w300/" +
                                      item.profile_path
                                    : defaultDP
                                }
                                alt=""
                                className="w-[25vw] sm:w-[12vw]"
                              />
                              <h1 className="capitalize text-base sm:text-xl w-[75%]">
                                name: {item.name}
                              </h1>
                              <h1 className="capitalize text-sm sm:text-lg w-[75%]">
                                chracter name: {item.character}
                              </h1>
                            </Link>
                          );
                        })
                      : credits.cast.slice(0, 18).map((item, index) => {
                          return (
                            <Link
                              key={index}
                              className="w-[25vw] sm:w-auto"
                              to={`/details/person/${item.id}`}
                            >
                              <img
                                src={
                                  item.profile_path !== null
                                    ? import.meta.env.VITE_BASE_IMAGE_URL +
                                      "/w300/" +
                                      item.profile_path
                                    : defaultDP
                                }
                                alt=""
                                className="w-[25vw] sm:w-[12vw]"
                              />
                              <h1 className="capitalize text-base sm:text-xl w-[75%]">
                                name: {item.name}
                              </h1>
                              <h1 className="capitalize text-sm sm:text-lg w-[75%]">
                                chracter name: {item.character}
                              </h1>
                            </Link>
                          );
                        })}
                  </div>
                  <div className="self-end">
                    <button
                      type="button"
                      className="text-xs whitespace-nowrap sm:text-base flex items-center capitalize "
                      onClick={() => setShowCast(!showCast)}
                    >
                      {showCast === false ? (
                        <>
                          view all <AiOutlineArrowRight />
                        </>
                      ) : (
                        <>
                          view less{" "}
                          <AiOutlineArrowRight className="rotate-[-90deg]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              {credits.crew && credits.crew.length > 0 && (
                <div className="mx-4 my-2 sm:my-4 sm:mx-12 flex flex-col gap-6">
                  <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                    crew members
                  </h1>
                  <div className="flex flex-wrap items-start justify-around gap-2 sm:gap-5">
                    {showCast === true
                      ? credits.crew.map((item, index) => {
                          return (
                            <Link
                              key={index}
                              className="w-[25vw] sm:w-auto"
                              to={`/details/person/${item.id}`}
                            >
                              <img
                                src={
                                  item.profile_path !== null
                                    ? import.meta.env.VITE_BASE_IMAGE_URL +
                                      "/original/" +
                                      item.profile_path
                                    : defaultDP
                                }
                                alt=""
                                className="w-[25vw] sm:w-[12vw]"
                              />
                              <h1 className="capitalize text-base sm:text-xl w-[75%]">
                                name: {item.name}
                              </h1>
                              <h1 className="capitalize text-sm sm:text-lg w-[75%]">
                                designation: {item.job}
                              </h1>
                            </Link>
                          );
                        })
                      : credits.crew.slice(0, 18).map((item, index) => {
                          return (
                            <Link
                              key={index}
                              className="w-[25vw] sm:w-auto"
                              to={`/details/person/${item.id}`}
                            >
                              <img
                                src={
                                  item.profile_path !== null
                                    ? import.meta.env.VITE_BASE_IMAGE_URL +
                                      "/original/" +
                                      item.profile_path
                                    : defaultDP
                                }
                                alt=""
                                className="w-[25vw] sm:w-[12vw]"
                              />
                              <h1 className="capitalize text-base sm:text-xl w-[75%]">
                                name: {item.name}
                              </h1>
                              <h1 className="capitalize text-sm sm:text-lg w-[75%]">
                                designation: {item.job}
                              </h1>
                            </Link>
                          );
                        })}
                  </div>
                  <div className="self-end">
                    <button
                      type="button"
                      className="text-xs whitespace-nowrap sm:text-base flex items-center capitalize "
                      onClick={() => setShowCast(!showCast)}
                    >
                      {showCast === false ? (
                        <>
                          view all <AiOutlineArrowRight />
                        </>
                      ) : (
                        <>
                          view less{" "}
                          <AiOutlineArrowRight className="rotate-[-90deg]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {reviews && reviews.length > 0 && (
            <>
              <h1 className="text-lg sm:text-4xl capitalize font-semibold mx-4 my-2 sm:my-4 sm:mx-12">
                user reviews
              </h1>
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-around mx-4 my-2 sm:my-4 sm:mx-12 gap-4">
                {reviews.map((item, index) => (
                  <div key={index} className="sm:w-[40%] flex flex-col gap-2">
                    <div className="flex items-center gap-[5px]">
                      <img
                        src={
                          item.author_details.avatar_path !== null &&
                          !item.author_details.avatar_path.includes("http")
                            ? import.meta.env.VITE_BASE_IMAGE_URL +
                              "/w300/" +
                              item.author_details.avatar_path
                            : defaultDP
                        }
                        alt=""
                        className="w-[10vw] sm:w-[5vw] rounded-full h-[10vw] sm:h-[5vw]"
                      />
                      <p className="capitalize text-sm sm:text-base">
                        {item.author_details.name || item.author}
                      </p>
                    </div>
                    <p className="text-sm sm:text-base">{item.content}</p>
                    <div className="flex">
                      {[
                        ...Array(
                          item.author_details.rating
                            ? Math.floor(item.author_details.rating)
                            : 0
                        ),
                      ].map((x, i) => (
                        <AiFillStar color="yellow" key={i} />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base">
                      {item.updated_at
                        .replace("T", " ")
                        .slice(
                          0,
                          item.updated_at.replace("T", " ").indexOf(".")
                        )}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          {simailars && simailars.length > 0 && (
            <section className="flex flex-col gap-6 mx-4 my-2 sm:my-4 sm:mx-12">
              <div className="flex justify-between">
                <h2 className="text-lg sm:text-4xl capitalize font-semibold">
                  similar {mediaType === "movie" ? "movies" : "tv shows"}
                </h2>
                <Link
                  className="border-black border-[2px] border-solid flex items-center gap-[5px] px-2 py-1 rounded-xl capitalize dark:border-white text-xs whitespace-nowrap sm:text-base"
                  to={`/all/similar/${id}`}
                  onClick={() => {
                    getSearchQuery(
                      pageData.name || pageData.original_title,
                      "Similar Movies"
                    );
                  }}
                >
                  view more <LuMoreHorizontal />
                </Link>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                {simailars.slice(0, 6).map(
                  (data, index) =>
                    (data.poster_path || data.backdrop_path) && (
                      <Link
                        className="relative popularCards"
                        key={index}
                        to={`/details/${mediaType}/${data.id}`}
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

export default MovieTvDetailsScreen;
