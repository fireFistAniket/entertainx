import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSeasonCredits,
  getSeasonDetails,
  getSeasonEpisodeDetails,
  getSeasonImages,
  getSeasonVideos,
} from "../api/tvSeasonDetailsApi.js";
import Loader from "../components/Loader.jsx";
import { SlCalender } from "react-icons/sl";
import defaultDP from "../assets/defaultDP.png";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { IoMdTimer } from "react-icons/io";

const TvSeasonDetails = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({});
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState({});
  const [episodeData, setEpisodeData] = useState({});
  const [video, setVideo] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const { id } = useParams();
  const { seasonNumber } = useParams();
  const photoSliderRef = useRef();
  useEffect(() => {
    const getPageData = async () => {
      setLoading(true);
      await getSeasonDetails(id, seasonNumber).then((res) => {
        setPageData(res);
        getEpisodeDetails(id, seasonNumber, res.episodes[0].episode_number);
      });
      await getSeasonImages(id, seasonNumber).then((res) => setImages(res));
      await getSeasonCredits(id, seasonNumber).then((res) => setCredits(res));
      await getSeasonVideos(id, seasonNumber).then((res) => setVideo(res));
      setLoading(false);
    };
    getPageData();
  }, []);
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
  const getEpisodeDetails = async (tvId, seasonNumber, episodeNumber) => {
    await getSeasonEpisodeDetails(tvId, seasonNumber, episodeNumber).then(
      (res) => setEpisodeData(res)
    );
  };
  return (
    <>
      {loading ? (
        <Loader loadFor={"season"} />
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
                        className="absolute bottom-0 right-0 w-full h-[90vw] sm:h-[45vw] object-cover object-top transition-transform ease-linear duration-500 translate-x-0"
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
                <div className="flex items-start justify-start w-fit">
                  {images &&
                    images
                      .slice(0, 1)
                      .map((item, index) => (
                        <img
                          src={
                            import.meta.env.VITE_BASE_IMAGE_URL +
                            "/original" +
                            item.file_path
                          }
                          alt=""
                          key={index}
                          className="sm:w-[18vw] mr-0"
                        />
                      ))}
                </div>
                <div className="flex flex-col gap-1 sm:gap-4 px-4 sm:px-12 text-white">
                  <h1 className="text-xl sm:text-3xl capitalize">
                    {pageData.name}
                  </h1>
                  <p className="text-sm sm:text-lg sm:w-[60%]">
                    {window.innerWidth > 640
                      ? pageData.overview
                      : pageData.overview?.slice(0, 150) + "..."}
                  </p>
                  <div className="flex sm:w-[55%] flex-wrap gap-[3px]">
                    {credits.cast &&
                      credits.cast
                        .slice(0, window.innerWidth > 640 ? 30 : 16)
                        .map(
                          (item, index) =>
                            item.profile_path && (
                              <div
                                className="border-white border-[2px] border-solid rounded-full"
                                key={index}
                              >
                                <img
                                  src={
                                    import.meta.env.VITE_BASE_IMAGE_URL +
                                    "/original" +
                                    item.profile_path
                                  }
                                  title={item.name}
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
                        {pageData.vote_average !== 0
                          ? `rating: ${Math.floor(pageData.vote_average)}/10`
                          : "not rated"}
                      </p>
                    </div>
                    <div className="flex items-center gap-[3.5px] text-sm sm:text-xl capitalize">
                      <SlCalender />
                      {pageData.release_date || pageData.air_date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {window.innerWidth > 640 && video && video.length > 0 && (
            <div className="mx-12 my-6">
              <h1 className="text-4xl capitalize font-semibold ">featurette</h1>
              <div className="flex flex-wrap gap-4 items-center justify-evenly">
                {video.slice(0, 12).map((item, index) => (
                  <div key={index}>
                    <iframe
                      className="w-[20vw] h-[10vw]"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
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
          {pageData && pageData.episodes?.length > 0 && (
            <div className="mx-4 my-2 sm:my-4 sm:mx-12 flex flex-col">
              <h1 className="text-lg sm:text-4xl my-4 capitalize font-semibold">
                episode list
              </h1>
              <div className="sm:py-4 flex w-full flex-col sm:flex-row">
                <div className="flex sm:flex-col sm:h-[25vw] overflow-y-scroll gap-2 no-scrollbar sm:px-6 sm:mx-4 items-center scroll-smooth mb-2 pb-2">
                  {pageData.episodes.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      className="border-black border-[2px] px-4 py-2 dark:border-white rounded-xl whitespace-nowrap sm:mx-4 sm:my-2 capitalize w-fit"
                      onClick={() =>
                        getEpisodeDetails(id, seasonNumber, item.episode_number)
                      }
                    >
                      episode: {item.episode_number}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-start sm:mx-2 sm:w-[70%]">
                  <div className="flex flex-col sm:mx-4 gap-3 sm:max-w-[50%]">
                    <h1 className="text-base sm:text-2xl capitalize">
                      episode name: {episodeData.name}
                    </h1>
                    <p className="text-sm sm:text-lg">{episodeData.overview}</p>
                    <div className="flex items-center capitalize gap-[5px] text-sm sm:text-base">
                      rating
                      {episodeData.vote_average ? (
                        [
                          ...Array(
                            Math.ceil(episodeData.vote_average)
                              ? Math.ceil((episodeData.vote_average * 5) / 10)
                              : 3
                          ),
                        ].map((x, i) => <AiFillStar color="yellow" key={i} />)
                      ) : (
                        <p className="text-sm sm:text-lg capitalize">
                          not rated
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-[5px] text-sm sm:text-base">
                      <SlCalender />
                      {episodeData.air_date}
                    </div>
                    <div className="flex items-center gap-[5px] text-sm sm:text-base">
                      <IoMdTimer />
                      {episodeData.runtime}min
                    </div>
                  </div>
                  <div>
                    <img
                      src={
                        import.meta.env.VITE_BASE_IMAGE_URL +
                        "/original" +
                        episodeData.still_path
                      }
                      alt=""
                      className="w-[calc(100%-25vw)] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {credits && credits.cast?.length > 0 && (
            <div className="mx-4 my-2 sm:my-4 sm:mx-12 flex flex-col gap-6">
              <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                casting
              </h1>
              <div className="flex flex-wrap items-center justify-around gap-2 sm:gap-5">
                {showCast === true
                  ? credits.cast.map((item, index) => {
                      return (
                        <div key={index} className="w-[25vw] sm:w-auto">
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
                        </div>
                      );
                    })
                  : credits.cast.slice(0, 18).map((item, index) => {
                      return (
                        <div key={index} className="w-[25vw] sm:w-auto">
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
                        </div>
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
          {credits && credits.crew?.length > 0 && (
            <div className="mx-4 my-2 sm:my-4 sm:mx-12 flex flex-col gap-6">
              <h1 className="text-lg sm:text-4xl capitalize font-semibold">
                crew
              </h1>
              <div className="flex flex-wrap items-center justify-around gap-2 sm:gap-5">
                {showCast === true
                  ? credits.crew.map((item, index) => {
                      return (
                        <div key={index} className="w-[25vw] sm:w-auto">
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
                            designation: {item.known_for_department}
                          </h1>
                        </div>
                      );
                    })
                  : credits.crew.slice(0, 18).map((item, index) => {
                      return (
                        <div key={index} className="w-[25vw] sm:w-auto">
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
                            designation: {item.known_for_department}
                          </h1>
                        </div>
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
        </main>
      )}
    </>
  );
};

export default TvSeasonDetails;
