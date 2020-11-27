import React, { useEffect, useState } from "react";
import NewsCard from './NewsCard';

function NewsCardList({ loggedIn,
  isSavedPath,
  articles,
  onSetArticles }) {

  const [slicer, setSlicer] = useState(3);
  const [isNull, setIsNull] = useState(false);

  useEffect(() => {
    if (slicer >= articles.length) {
      setIsNull(true);
    } else {
      setIsNull(false);
    }
  }, [slicer, articles]);

  return (
    <section className="result">
      <div className="result__pool">
        <h2 className="result__title">Результаты поиска</h2>
        <div className="elements">
        {articles.slice(0, slicer).map((article) => (
            <article key={article.publishedAt} className="elements__element">
              <NewsCard
            loggedIn={loggedIn}
            isSavedPath={isSavedPath}
            articles={articles}
            onSetArticles={onSetArticles}
            article={article}
              />
            </article>
          ))}
        </div>
        {
          isNull ? null : (
            <button className="result__button"
              onClick={() => {
                onSetArticles(JSON.parse(localStorage.getItem("articles")));
                setSlicer(slicer + 3);
              }}
            >Показать еще</button>
          )
        }
      </div>
    </section>
  );
}

export default NewsCardList;
