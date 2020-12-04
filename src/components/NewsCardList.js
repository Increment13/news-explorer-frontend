import React, { useEffect, useState } from "react";
import NewsCard from './NewsCard';

function NewsCardList({ loggedIn,
  isSavedPath,
  articles,
  onSetArticles,
  handleSaveArticles,
  handleDeleteArticles
}) {

  const [slicer, setSlicer] = useState(3);
  const [isNull, setIsNull] = useState(false);

  useEffect(() => {
    if (slicer >= articles.length) {
      setIsNull(true);
    } else {
      setIsNull(false);
    }
  }, [slicer, articles]);

  function hashCode(s) {
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  }

  return (
    <section className="result">
      <div className="result__pool">
        <h2 className="result__title">Результаты поиска</h2>
        <div className="elements">
          {articles.slice(0, slicer).map((article) => (
            <article key={hashCode(article.publishedAt || article.title || article.source.name)} className="elements__element">
              <NewsCard
                loggedIn={loggedIn}
                isSavedPath={isSavedPath}
                onSetArticles={onSetArticles}

                keyword={article.keyword}
                idSavedArticle={article._id}
                title={article.title}
                text={article.description}
                date={article.publishedAt}
                source={article.source.name}
                link={article.url}
                image={article.urlToImage}


                handleSaveArticles={handleSaveArticles}
                handleDeleteArticles={handleDeleteArticles}
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
