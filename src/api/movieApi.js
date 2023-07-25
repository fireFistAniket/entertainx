const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;
const trendingAllMovie = async () => {
  try {
    const res = await fetch(`${url}/movie/popular`, options);
    const data = await res.json();
    let movie = [];
    for (let index = 0; index < 18; index++) {
      movie.push(data.results[index]);
    }
    return movie;
  } catch (error) {
    console.log(error);
  }
};
const topRatedMovie = async () => {
  try {
    const res = await fetch(`${url}/movie/top_rated`, options);
    const data = await res.json();
    let movie = [];
    for (let index = 0; index < 18; index++) {
      movie.push(data.results[index]);
    }
    return movie;
  } catch (error) {
    console.log(error);
  }
};
const upComingMovie = async () => {
  try {
    const res = await fetch(`${url}/movie/upcoming`, options);
    const data = await res.json();
    let movie = [];
    for (let index = 0; index < 18; index++) {
      movie.push(data.results[index]);
    }
    return movie;
  } catch (error) {
    console.log(error);
  }
};

export { trendingAllMovie, topRatedMovie, upComingMovie };
