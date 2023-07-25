const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;
const getDetails = async (id, media_type) => {
  try {
    const res = await fetch(`${url}/${media_type}/${id}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getVideo = async (id, media_type) => {
  try {
    const res = await fetch(`${url}/${media_type}/${id}/videos`, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const getCredit = async (id, media_type) => {
  try {
    const res = await fetch(`${url}/${media_type}/${id}/credits`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getImage = async (id, media_type) => {
  try {
    const res = await fetch(`${url}/${media_type}/${id}/images`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getCollection = async (id) => {
  try {
    const res = await fetch(`${url}/collection/${id}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getReview = async (id, media_type) => {
  try {
    const res = await fetch(`${url}/${media_type}/${id}/reviews`, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const getSimilars = async (id, media_type) => {
  try {
    const res = await fetch(`${url}/${media_type}/${id}/similar`, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const getShowSeasons = async (id, seasonNumber) => {
  try {
    const res = await fetch(`${url}/${id}/season/${seasonNumber}`, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
export {
  getDetails,
  getVideo,
  getCredit,
  getImage,
  getCollection,
  getReview,
  getSimilars,
  getShowSeasons,
};
