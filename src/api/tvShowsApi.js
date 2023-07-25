const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;

const airingTodayTvShows = async () => {
  try {
    const res = await fetch(`${url}/tv/airing_today`, options);
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
const onTheAirTvShows = async () => {
  try {
    const res = await fetch(`${url}/tv/on_the_air`, options);
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
const popularTvShows = async () => {
  try {
    const res = await fetch(`${url}/tv/popular`, options);
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
const topRatedTvShows = async () => {
  try {
    const res = await fetch(`${url}/tv/top_rated`, options);
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
export { airingTodayTvShows, onTheAirTvShows, popularTvShows, topRatedTvShows };
