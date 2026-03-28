export const NewsFeedResolver = {
  getNewsFeed: async () => {
    try {
      const newsData = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
      ).then((response) => response.json());

      if (newsData.Data) {
        return newsData.Data;
      }

      return [];
    } catch (err) {
      const message = err instanceof Error ? err.message : "No news feed found";
      throw new Error(message);
    }
  },
};
