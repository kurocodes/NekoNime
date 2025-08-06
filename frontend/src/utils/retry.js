export const infiniteRetry = async (fn, delay = 3000) => {
  while (true) {
    try {
      return await fn();
    } catch (err) {
      console.error("Retrying after failure:", err.message);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export const retryWithDelay = async (fn, retries = 3, delay = 3000) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= retries) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};
