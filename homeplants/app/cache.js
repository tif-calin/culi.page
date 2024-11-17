
export const makeGet = async (
  url,
  headers,
  options = { since: 60 }
) => {
  const key = url.replace(/^http.*\/\//);

  if (!key) return;

  const timestamps = localStorage.getItem(`__timestamps__`);
  if (
    timestamps[key] &&
    options?.since &&
    new Date(timestamps[key]) > (new Date() - options.since * 1_000)
  ) return JSON.parse(localStorage.getItem(key));

};
