import React, { useEffect, useRef, useState } from "react";
import { FaImdb } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import { Link } from "react-router-dom";
import { trendingHero } from "../api/heroApi";
import Loader from "./Loader";
const Hero = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const sectionHero = useRef();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await trendingHero(type).then((data) => setData(data));
      setLoading(false);
    };
    getData();
    let currentIndex = 0;
    const slidr = setInterval(() => {
      sectionHero.current.childNodes[
        currentIndex
      ].style.transform = `translateX(0%)`;
      sectionHero.current.childNodes.forEach((elem) => {
        if (sectionHero.current.childNodes[currentIndex] !== elem) {
          elem.style.transform = `translateX(100%)`;
        }
      });
      if (currentIndex === sectionHero.current.childNodes.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
    }, 3000);
    return () => {
      clearInterval(slidr);
    };
  }, []);

  return (
    <section
      className="flex w-full relative overflow-hidden h-[80vw] sm:h-[40vw]"
      ref={sectionHero}
    >
      {loading ? (
        <Loader loadFor={"slideshow"} />
      ) : (
        data &&
        data.map((elem, index) => {
          return (
            <div
              className="absolute w-[100vw] slides transition-[transform] ease-in-out duration-500"
              key={index}
            >
              <div>
                <img
                  src={
                    import.meta.env.VITE_BASE_IMAGE_URL +
                    "/original/" +
                    elem.backdrop_path
                  }
                  alt=""
                  className="w-full h-[80vw] sm:h-[40vw]"
                />
              </div>
              <div className="absolute bottom-0 text-white flex flex-col gap-2 sm:gap-6 px-4 py-2 sm:px-12 sm:py-4 bg-[#00000060]">
                <div>
                  <p className="text-sm sm:text-2xl capitalize text-[#dadaeed2]">
                    released:{elem.release_date}
                  </p>
                </div>
                <div>
                  <h1 className="text-xl md:text-7xl uppercase">
                    {elem.title || elem.name}
                  </h1>
                </div>
                <div>
                  <p className="text-sm sm:text-lg sm:w-[55%] text-[#dadaeed2]">
                    {window.innerWidth < 640
                      ? elem.overview.slice(0, 150) + "..."
                      : elem.overview}
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <FaImdb
                    size="2.5em"
                    color="yellow"
                    className="bg-black text-sm"
                  />
                  <p className="text-sm sm:text-3xl text-[#e8e8e985]">
                    {Math.floor(elem.vote_average)}/10
                  </p>
                </div>
                <div className="border-[1px] w-fit px-2 py-1 sm:px-4 sm:py-2 rounded-xl">
                  <Link
                    className="flex items-center gap-[3px] capitalize text-sm sm:text-lg"
                    to={`/entertainx/details/${elem.media_type}/${elem.id}`}
                  >
                    know more{" "}
                    <LuMoreHorizontal size="1.5em" className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default Hero;
