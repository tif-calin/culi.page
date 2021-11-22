const getRandom = (arr, n = 1) => arr.sort(() => Math.random() - 0.5).slice(0, n);

export { getRandom };
