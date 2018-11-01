export const SET_EPISODE = 'SET_EPISODE';
export const setEpisode = (episodeData) => ({
  type: SET_EPISODE,
  episodeData
});

export const CLEAR_EPISODE = 'CLEAR_EPISODE';
export const clearEpisode = () => ({
  type: CLEAR_EPISODE
});