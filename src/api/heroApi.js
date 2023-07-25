const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;
const trendingHero = async (type) => {
  try {
    const res = await fetch(`${url}/trending/${type}/week`, options);
    const data = await res.json();
    let heroData = [];
    heroData.push(data.results[0]);
    heroData.push(data.results[1]);
    heroData.push(data.results[2]);
    return heroData;
  } catch (error) {
    console.log(error);
  }
};

export { trendingHero };
