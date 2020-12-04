import React from "react";
import NewsCard from './NewsCard';

function NewsSavedCardList({ loggedIn,
  isSavedPath,
  articles,
  handleSaveArticles,
  handleDeleteArticles
 }) {



  return (
    <section className="result">
      <div className="result__pool">
        <div className="elements">
          {articles.map((article) => (
            <article key={article._id} className="elements__element">
              <NewsCard
                loggedIn={loggedIn}
                isSavedPath={isSavedPath}

                idSavedArticle={article._id}
                keyword={article.keyword}
                title={article.title}
                text={article.text}
                date={article.date}
                source={article.source}
                link={article.url}
                image={article.image}

                handleSaveArticles={handleSaveArticles}
                handleDeleteArticles={handleDeleteArticles}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSavedCardList;
