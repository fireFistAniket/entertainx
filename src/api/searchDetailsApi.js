const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;

const searchResult = async (type, filter, page, sub) => {
  try {
    let res;
    if (sub) {
      res = await fetch(
        `${url}/${type}/${filter}/${sub}?page=${page}`,
        options
      );
    } else {
      res = await fetch(`${url}/${type}/${filter}?page=${page}`, options);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const searchResultByGenre = async (type, genre, page) => {
  try {
    const res = await fetch(
      `${url}/discover/${type}?page=${page}&with_genres=${genre}`,
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const searchResultOfPeopleMoviesCredit = async (id, page) => {
  try {
    const res = await fetch(
      `${url}/discover/movie?page=${page}&with_people=${id}`,
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const searchResultOfQury = async (query, page) => {
  try {
    const res = await fetch(
      `${url}/search/multi?query=${query}&page=${page}`,
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const searchResultOfPeopleShowsCredit = async (id) => {
  try {
    const res = await fetch(`${url}/person/${id}/tv_credits`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export {
  searchResult,
  searchResultByGenre,
  searchResultOfPeopleMoviesCredit,
  searchResultOfQury,
  searchResultOfPeopleShowsCredit,
};
