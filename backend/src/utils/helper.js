const getNextSeasonAndYear = () => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
  const currentSeasonIdx = Math.floor(month / 3);
  const nextSeasonIdx = (currentSeasonIdx + 1) % 4;
  const nextYear = nextSeasonIdx === 0 ? year + 1 : year;

  return {
    season: seasons[currentSeasonIdx],
    seasonNext: seasons[nextSeasonIdx],
    year: nextYear,
  };
};

async function retryUntilSuccess(fn, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();
      if (result) return result;
    } catch (err) {
      console.log(`Attempt ${attempt} failed: ${err.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, delay * attempt));
  }

  return null;
}

module.exports = {
  getNextSeasonAndYear,
  retryUntilSuccess,
};
