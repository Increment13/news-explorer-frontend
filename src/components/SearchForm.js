import React from 'react';
import background from '../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png';
import * as newsapi from '../api/NewsApi.js';

function SearchForm({ onSetIsLoading, onSetIsNotFoundResult, onSetIsResult, onSetArticles, savedArticles, loggedIn }) {

  const [inputValue, setInputValue] = React.useState('');

  function handleSearchChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem("articles");
    if (inputValue === '') {
      return;
    }

    onSetIsLoading(true);
    onSetIsNotFoundResult(false);
    newsapi.getNews(inputValue, "ru", 7, 100)
      .then((res) => {
        if (res.status === "ok" && res.articles.length > 0) {
          const articles = res.articles;
          articles.map((item) => {

            if (loggedIn) {
              savedArticles.forEach(savedArticle => {
                if (savedArticle.link === item.url) {
                  item._id = savedArticle._id;
                }
                else {
                  item._id = '';
                }
              })
            }
            item.keyword = inputValue;

            return item;
          });
          onSetArticles(articles);
          localStorage.setItem("articles", JSON.stringify(articles));
          onSetIsResult(true);
          onSetIsNotFoundResult(false);
        } else {
          onSetIsResult(false);
          onSetIsNotFoundResult(true);
        }
      })
      .catch((err) => {
        if (err) {
          onSetIsResult(false);
        }
        console.log(err);
      })
      .finally(() => {
        setInputValue("");
        onSetIsLoading(false);
      });
  }

  return (
    <section className="searcher">
      <div className="searcher__square">
        <h1 className="searcher__title">Что творится в мире?</h1>
        <span className="searcher__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</span>
        <form id="searcher" className="searcher__form">
          <input className="searcher__input"
            id="inputsearcher"
            name="searcher"
            type="text"
            required
            placeholder="Введите тему новости"
            value={inputValue || ''}
            onChange={handleSearchChange} />
          <button className="searcher__button" onClick={handleSubmit}>Искать</button>
        </form>
      </div>
      <div className="searcher__image-container">
        <img className="searcher__image" src={background} alt="изображение с телефоном" />
      </div>
    </section>
  );
}

export default SearchForm;


