const URL_NEWSAPI = 'http://newsapi.org/v2/top-headlines/'
const API_KEY = '43e6cbd5b52b4d9f9cc4455ca17cab86';

function getNews(query, country = "ru", rangeDays = 7, pageSize = 20) {
  const dateFrom = new Date(Date.now() - 86400000 * rangeDays)
    .toJSON()
    .split("T")[0];
  const dateTo = new Date().toJSON().split("T")[0];

  return fetch(
    `${URL_NEWSAPI}?q=${query}&country=${country}&from=${dateFrom}&to=${dateTo}&pageSize=${pageSize}&apiKey=${API_KEY}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export default getNews;
