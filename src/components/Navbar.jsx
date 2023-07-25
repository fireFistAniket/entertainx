import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsFillMoonFill, BsFillSunFill, BsSearch } from "react-icons/bs";
import { RiMovie2Fill } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getTheme } from "../slices/themeSlice";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { getParams } from "../slices/searchSlice";
const Navbar = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const sideNavRef = useRef();
  const searchModal = useRef();
  const [searchDetails, setSearchDetails] = useState([]);
  const [searchQury, setSearchQury] = useState("");

  useLayoutEffect(() => {
    theme === true
      ? document.querySelector("html").classList.add("dark")
      : document.querySelector("html").classList.remove("dark");
  }, [theme]);
  useEffect(() => {
    setSearchQury("");
    setSearchDetails([]);
    toggleNav("");
  }, [location.pathname]);
  const toggleNav = (act) => {
    switch (act) {
      case "openNav":
        sideNavRef.current.classList.remove("hidden");
        sideNavRef.current.classList.remove("invisible");
        sideNavRef.current.classList.remove("opacity-0");
        break;

      case "closeNav":
        sideNavRef.current.classList.add("hidden");
        sideNavRef.current.classList.add("invisible");
        sideNavRef.current.classList.add("opacity-0");
        break;
      case "openSearchModal":
        searchModal.current.classList.remove("hidden");
        searchModal.current.classList.remove("invisible");
        searchModal.current.classList.remove("opacity-0");
        break;
      case "closeSearchModal":
        searchModal.current.classList.add("hidden");
        searchModal.current.classList.add("invisible");
        searchModal.current.classList.add("opacity-0");
        break;
      default:
        sideNavRef.current.classList.add("hidden");
        sideNavRef.current.classList.add("invisible");
        sideNavRef.current.classList.add("opacity-0");
        searchModal.current.classList.add("hidden");
        searchModal.current.classList.add("invisible");
        searchModal.current.classList.add("opacity-0");
        break;
    }
  };
  const getSearchResult = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2E1MzljODc3NjkzZDFlZjYwMTI1ODlkZjZiMDQ3MyIsInN1YiI6IjY0YjBjNjgxZDIzNmU2MDBmZjJjYjNkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1RnHBL7lhCKvT-XgvBBENgCpntS6DjaicTYyTui1JE",
          },
        }
      );
      const data = await res.json();
      setSearchDetails(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getSearchQuery = (fstQuery, sndQuery) => {
    dispatch(
      getParams({
        fstParam: fstQuery,
        sndParam: sndQuery,
      })
    );
  };
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-br from-[#020711] text-white z-10">
      <div className="sm:flex hidden  justify-between items-center bg-transparent mx-12 my-8">
        <div>
          <h3 className="text-3xl font-bold">
            <Link
              to="/"
              className="text-[#99A4AA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] flex items-center gap-[3px]"
            >
              EntertainX <RiMovie2Fill />
            </Link>
          </h3>
        </div>
        <div>
          <ul className="flex items-center">
            <li className="capitalize hover:font-bold">
              <NavLink
                to="/"
                className="text-[#B1B7BA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)]"
              >
                home
              </NavLink>
            </li>
            <li className="capitalize ml-4 hover:font-bold">
              <NavLink
                to="/movies"
                className="text-[#B1B7BA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)]"
              >
                movies
              </NavLink>
            </li>
            <li className="capitalize ml-4 hover:font-bold">
              <NavLink
                to="/tv-shows"
                className="text-[#B1B7BA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)]"
              >
                tv shows
              </NavLink>
            </li>
            <li className="capitalize ml-4 cursor-pointer text-[#B1B7BA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] flex items-center gap-[1.5px] group relative">
              populars{" "}
              <AiOutlineRight className="group-hover:rotate-90 transition-[transform]" />
              <ul className="hidden absolute top-full group-hover:flex flex-col w-full">
                <li className="capitalize hover:font-bold whitespace-nowrap">
                  <Link
                    to="/all/movie/popular"
                    onClick={() => {
                      getSearchQuery("Movies", "Popular");
                    }}
                  >
                    popular movies
                  </Link>
                </li>
                <li className="capitalize hover:font-bold whitespace-nowrap">
                  <Link
                    to="/all/tv/popular"
                    onClick={() => {
                      getSearchQuery("TV", "Popular");
                    }}
                  >
                    popular shows
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center flex-col relative">
            <form
              className="flex items-center border-b-[1px] gap-[8px] border-[#B1B7BA] mx-2 my-1 py-1 px-2"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search/${searchQury}`);
              }}
            >
              <BsSearch className="text-[#B1B7BA] drop-shadow-lg" />
              <input
                type="search"
                placeholder="Search"
                className="border-none outline-none px-2 bg-transparent placeholder:text-[#B1B7BA] placeholder:[text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] [-webkit-search-cancel-button]:cursor-pointer"
                value={searchQury}
                onChange={(e) => {
                  getSearchResult(e.target.value);
                  setSearchQury(e.target.value);
                }}
              />
            </form>
            {searchDetails && searchDetails.length > 0 && (
              <div className="absolute top-[100%] left-0 flex flex-col items-center w-full">
                {searchDetails.slice(0, 3).map((item, index) => (
                  <Link
                    key={index}
                    className="flex w-full items-center gap-[8px] bg-[#00000055] px-2 py-1 border-b-[1px] border-dashed border-gray-600 dark:bg-[#ffffffc4]"
                    to={`/details/${item.media_type}/${item.id}`}
                  >
                    <div>
                      <img
                        src={
                          import.meta.env.VITE_BASE_IMAGE_URL +
                          "/original/" +
                          (item.backdrop_path ||
                            item.poster_path ||
                            item.profile_path)
                        }
                        alt=""
                        className="w-8 h-8 object-fill rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-white dark:text-black">
                        {item.name || item.title}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex">
            <div>
              <label className="relative inline-block w-9 h-5 group-checked:bg-blue-500">
                <input
                  type="checkbox"
                  id="toggleSwitch"
                  onChange={() => dispatch(getTheme(!theme))}
                  className="hidden group peer checked:translate-x-5"
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-[#ccc] cursor-pointer delay-400 before:absolute before:content-[''] before:h-5 before:w-5 before:left-0 before:bottom-0 before:rounded-full before:delay-400 before:bg-white peer-checked:bg-blue-500 peer-checked:before:translate-x-5"></span>
                {theme === false ? (
                  <BsFillMoonFill className="text-slate-800 absolute text-sm top-[0.2vw] left-[0.2vw] rounded-2xl cursor-pointer delay-400 peer-checked:translate-x-5" />
                ) : (
                  <BsFillSunFill className="text-slate-800 absolute text-sm top-[0.2vw] left-[0.2vw] rounded-2xl cursor-pointer delay-400 peer-checked:translate-x-5" />
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="flex sm:hidden items-center justify-between mx-2 my-2 relative">
        <div className="flex gap-1">
          <button type="button" onClick={() => toggleNav("openNav")}>
            <CiMenuBurger size="1.5em" />
          </button>
          <h3 className="text-2xl font-bold">
            <Link
              to="/"
              className="text-[#99A4AA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] flex items-center gap-[3px]"
            >
              EntertainX <RiMovie2Fill />
            </Link>
          </h3>
        </div>
        <div
          className="hidden invisible opacity-0 transition-[opacity,visibility] delay-500 fixed top-0 left-0 h-full w-full z-[1055] bg-[radial-gradient(circle,_#ffffff,_#f4f4fc,_#e5eafa,_#d4e1f8,_#c0d8f5,_#b3d2f5,_#a4cdf4,_#95c7f4,_#8ec2f7,_#89bcfa,_#86b6fd,_#85b0ff)] dark:bg-[linear-gradient(to_bottom,_#000002,_#07020e,_#130213,_#1d0114,_#250010,_#290111,_#2e0111,_#330010,_#360019,_#370023,_#35002f,_#2e023b)]"
          ref={sideNavRef}
        >
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={(e) => toggleNav("closeNav")}
          >
            <AiOutlineClose className="mx-2 my-1" size="2em" />
          </button>
          <ul className="flex items-center justify-center flex-col h-full w-full">
            <li className="capitalize hover:font-bold">
              <NavLink
                to="/"
                className="dark:text-[#B1B7BA] text-[#000] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] text-2xl"
              >
                home
              </NavLink>
            </li>
            <li className="capitalize hover:font-bold">
              <NavLink
                to="/movies"
                className="dark:text-[#B1B7BA] text-[#000] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] text-2xl"
              >
                movies
              </NavLink>
            </li>
            <li className="capitalize hover:font-bold">
              <NavLink
                to="/tv-shows"
                className="dark:text-[#B1B7BA] text-[#000] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] text-2xl"
              >
                tv shows
              </NavLink>
            </li>
            <li className="capitalize ml-4 cursor-pointer text-[#B1B7BA] [text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] flex items-end gap-[1.5px] group relative text-2xl">
              populars{" "}
              <AiOutlineRight className="group-hover:rotate-90 transition-[transform]" />
              <ul className="hidden absolute top-full group-hover:flex flex-col w-full">
                <li className="capitalize hover:font-bold whitespace-nowrap">
                  <Link
                    to="/all/movie/popular"
                    onClick={() => {
                      getSearchQuery("Movies", "Popular");
                    }}
                  >
                    popular movies
                  </Link>
                </li>
                <li className="capitalize hover:font-bold whitespace-nowrap">
                  <Link
                    to="/all/tv/popular"
                    onClick={() => {
                      getSearchQuery("TV", "Popular");
                    }}
                  >
                    popular shows
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => toggleNav("openSearchModal")}>
            <BsSearch className="text-[#B1B7BA] drop-shadow-lg" size="1.5em" />
          </button>
          <div
            className="h-[80vh] hidden invisible opacity-0 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-br from-[#020711] w-full backdrop-blur-[3px]"
            ref={searchModal}
          >
            <div className="relative flex items-center flex-col px-2 mx-2 py-1 my-1">
              <button
                type="button"
                className="self-end"
                onClick={(e) => toggleNav("closeSearchModal")}
              >
                <AiOutlineClose className="" size="1.5em" />
              </button>
              <form
                className="flex items-center border-b-[1px] gap-[8px] border-[#B1B7BA] w-full "
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/search/${searchQury}`);
                }}
              >
                <BsSearch className="text-[#B1B7BA] drop-shadow-lg" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-none outline-none px-2 bg-transparent placeholder:text-[#B1B7BA] placeholder:[text-shadow:_0_2px_3px_rgb(0_0_0_/_65%)] [-webkit-search-cancel-button]:cursor-pointer w-full"
                  value={searchQury}
                  onChange={(e) => {
                    getSearchResult(e.target.value);
                    setSearchQury(e.target.value);
                  }}
                />
              </form>
              {searchDetails && searchDetails.length > 0 && (
                <div className="flex flex-col items-center w-full">
                  {searchDetails.slice(0, 10).map((item, index) => (
                    <Link
                      key={index}
                      className="flex w-full items-center gap-[8px] bg-[#00000055] px-2 py-1 border-b-[1px] border-dashed border-gray-600 dark:bg-[#ffffffc4]"
                      to={`/details/${item.media_type}/${item.id}`}
                    >
                      <div>
                        <img
                          src={
                            import.meta.env.VITE_BASE_IMAGE_URL +
                            "/original/" +
                            (item.backdrop_path ||
                              item.poster_path ||
                              item.profile_path)
                          }
                          alt=""
                          className="w-8 h-8 object-fill rounded-full"
                        />
                      </div>
                      <div>
                        <h1 className="text-white dark:text-black">
                          {item.name || item.title}
                        </h1>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="relative inline-block w-9 h-5 group-checked:bg-blue-500">
              <input
                type="checkbox"
                id="toggleSwitch"
                onChange={() => dispatch(getTheme(!theme))}
                className="hidden group peer checked:translate-x-5"
              />
              <span className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-[#ccc] cursor-pointer delay-400 before:absolute before:content-[''] before:h-5 before:w-5 before:left-0 before:bottom-0 before:rounded-full before:delay-400 before:bg-white peer-checked:bg-blue-500 peer-checked:before:translate-x-5"></span>
              {theme === false ? (
                <BsFillMoonFill className="text-slate-800 absolute text-sm top-[10%] left-[7%] rounded-2xl cursor-pointer delay-400 peer-checked:translate-x-5" />
              ) : (
                <BsFillSunFill className="text-slate-800 absolute text-sm top-[10%] left-[7%] rounded-2xl cursor-pointer delay-400 peer-checked:translate-x-5" />
              )}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
