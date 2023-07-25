import React from "react";
import loadingGifBlack from "../assets/3yDz.gif";
import loadingGifWhite from "../assets/477.gif";
const Loader = ({ loadFor }) => {
  return (
    <>
      <main className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-2">
          <img
            src={
              document.querySelector("html").classList.contains("dark")
                ? loadingGifWhite
                : loadingGifBlack
            }
            alt=""
          />
          <p className="capitalize text-lg">
            please wait while we fetch {loadFor} for you
          </p>
        </div>
      </main>
    </>
  );
};

export default Loader;
