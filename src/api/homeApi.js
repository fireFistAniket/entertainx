const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;
const trendingAll = async () => {
  try {
    const res = await fetch(`${url}/trending/all/week`, options);
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
const trendingChracters = async () => {
  try {
    const res = await fetch(`${url}/trending/person/week`, options);
    const data = await res.json();
    let chrac = [];
    for (let index = 0; index < 18; index++) {
      chrac.push(data.results[index]);
    }
    return chrac;
  } catch (error) {
    console.log(error);
  }
};
export { trendingAll, trendingChracters };
