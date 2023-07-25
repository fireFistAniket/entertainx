const options = {
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};
const url = import.meta.env.VITE_BASE_MOVIE_URL;
const getSeasonDetails = async (tvId, seasonNumber) => {
  try {
    const res = await fetch(
      `${url}/tv/${tvId}/season/${seasonNumber}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getSeasonImages = async (tvId, seasonNumber) => {
  try {
    const res = await fetch(
      `${url}/tv/${tvId}/season/${seasonNumber}/images`,
      options
    );
    const data = await res.json();
    return data.posters;
  } catch (error) {
    console.log(error);
  }
};
const getSeasonCredits = async (tvId, seasonNumber) => {
  try {
    const res = await fetch(
      `${url}/tv/${tvId}/season/${seasonNumber}/credits`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getSeasonVideos = async (tvId, seasonNumber) => {
  try {
    const res = await fetch(
      `${url}/tv/${tvId}/season/${seasonNumber}/videos`,
      options
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
const getSeasonEpisodeDetails = async (tvId, seasonNumber, episodeNumber) => {
  try {
    const res = await fetch(
      `${url}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export {
  getSeasonDetails,
  getSeasonImages,
  getSeasonCredits,
  getSeasonVideos,
  getSeasonEpisodeDetails,
};
