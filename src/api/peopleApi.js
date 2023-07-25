const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;

const getPeopleDetails = async (personId) => {
  try {
    const res = await fetch(`${url}/person/${personId}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getPeopleImages = async (personId) => {
  try {
    const res = await fetch(`${url}/person/${personId}/images`, options);
    const data = await res.json();
    return data.profiles;
  } catch (error) {
    console.log(error);
  }
};
const getPeopleMovies = async (personId) => {
  try {
    const res = await fetch(
      `${url}/discover/movie?with_people=${personId}`,
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const getPeopleShows = async (personId) => {
  try {
    const res = await fetch(`${url}/person/${personId}/tv_credits`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { getPeopleDetails, getPeopleImages, getPeopleMovies, getPeopleShows };
