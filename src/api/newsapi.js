const URL_NEWSAPI = 'http://newsapi.org/v2/top-headlines/'
const API_KEY = '43e6cbd5b52b4d9f9cc4455ca17cab86';

export const getNews = (query, country = "ru", rangeDay = 7, pageSize = 100) => {
  const dateFrom = new Date(Date.now() - 24 * 3600 * 1000 * rangeDay)
    .toJSON()
    .split("T")[0];
  const dateTo = new Date().toJSON().split("T")[0];

  return fetch(
    `${URL_NEWSAPI}?q=${query}&country=${country}&from=${dateFrom}&to=${dateTo}&pageSize=${pageSize}&apiKey=${API_KEY}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
