import React, { useEffect, useState } from "react";
import { MdUnsubscribe } from "react-icons/md";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getParams } from "../slices/searchSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const [movieGenre, setMovieGenre] = useState([]);
  const [tvGenre, setTvGenre] = useState([]);
  useEffect(() => {
    const fetchMovieGenre = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2E1MzljODc3NjkzZDFlZjYwMTI1ODlkZjZiMDQ3MyIsInN1YiI6IjY0YjBjNjgxZDIzNmU2MDBmZjJjYjNkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1RnHBL7lhCKvT-XgvBBENgCpntS6DjaicTYyTui1JE",
            },
          }
        );
        const data = await res.json();
        setMovieGenre([]);
        for (let index = 0; index < 7; index++) {
          setMovieGenre((prev) => [...prev, data.genres[index]]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTvGenre = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/genre/tv/list", {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2E1MzljODc3NjkzZDFlZjYwMTI1ODlkZjZiMDQ3MyIsInN1YiI6IjY0YjBjNjgxZDIzNmU2MDBmZjJjYjNkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1RnHBL7lhCKvT-XgvBBENgCpntS6DjaicTYyTui1JE",
          },
        });
        const data = await res.json();
        setTvGenre([]);
        for (let index = 0; index < 7; index++) {
          setTvGenre((prev) => [...prev, data.genres[index]]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieGenre();
    fetchTvGenre();
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
      <footer className="w-full sm:px-12 sm:py-4 px-4 py-2 flex flex-wrap sm:flex-nowrap justify-between bg-[linear-gradient(to_left,_#538ab5,_#4c7ba4,_#456c94,_#3e5e83,_#375073,_#33496b,_#2e4262,_#2a3b5a,_#283957,_#263654,_#253452,_#23324f)] text-white dark:bg-[radial-gradient(circle,_#3a3a3d,_#3c3a3f,_#403a40,_#44393f,_#48393d,_#4b383d,_#4d373c,_#50363c,_#523440,_#523345,_#51334c,_#4d3353)]">
        <div className="flex flex-col gap-2 w-full sm:w-auto mb-6 sm:mb-auto">
          <div>
            <h1 className="text-2xl font-semibold flex gap-[3px] items-center">
              EntertainX
              <RiMovie2Fill />
            </h1>
            <p className="text-md capitalize">
              the gateway of entertainment world
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your mail"
              className="border-none outline-none bg-transparent"
            />
            <button
              type="button"
              className="flex items-center capitalize gap-[2px] bg-black px-4 py-2 rounded-2xl"
            >
              <MdUnsubscribe size="1.15em" />
              subscribe
            </button>
          </div>
        </div>
        <div className="flex sm:flex-col gap-2 w-full sm:w-auto items-center sm:items-start mb-4 justify-between sm:justify-start">
          <h3 className="capitalize text-xl">useful links</h3>
          <ul className="flex flex-wrap sm:block gap-2">
            <li className="capitalize">
              <Link to="/entertainx/">home</Link>
            </li>
            <li className="capitalize">
              <Link to="/entertainx/movies">movies</Link>
            </li>
            <li className="capitalize">
              <Link to="/entertainx/tv-shows">tv shows</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="capitalize text-lg">genres of movies</h3>
          <ul>
            {movieGenre.map((elm, index) => {
              return (
                <li className="capitalize" key={index}>
                  <Link
                    to={`/entertainx/genre/${"movie"}/${elm.id}`}
                    onClick={() => {
                      getSearchQuery("Movies", `${elm.name}`);
                    }}
                  >
                    {elm.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="capitalize text-lg">genres of tv shows</h3>
          <ul>
            {tvGenre.map((elm, index) => {
              return (
                <li className="capitalize" key={index}>
                  <Link
                    to={`/entertainx/genre/${"tv"}/${elm.id}`}
                    onClick={() => {
                      getSearchQuery("TV Shows", `${elm.name}`);
                    }}
                  >
                    {elm.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex sm:flex-col gap-2 w-full sm:w-auto items-center mt-4 justify-between sm:justify-normal sm:mt-auto">
          <h3 className="capitalize text-xl">follow us on</h3>
          <div className="flex gap-2 items-center">
            <a href="https://www.facebook.com" target="_blank" rel="norefferer">
              <BsFacebook size="1.3em" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="norefferer"
            >
              <AiFillInstagram size="1.3em" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="norefferer"
            >
              <BsTwitter size="1.3em" />
            </a>
          </div>
        </div>
      </footer>
      <div className="bg-white">
        <h1 className="text-center text-sm dark:text-black">
          <b>EntertainX</b> © All Rights Reserved || Design & Developed by{" "}
          <b>Aniket Saha</b>
        </h1>
      </div>
    </>
  );
};

export default Footer;
