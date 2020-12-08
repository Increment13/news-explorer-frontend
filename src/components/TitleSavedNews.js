import React, { useEffect, useState } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function TitleSavedNews({ articles }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [keywordsSort, setKeywordsSort] = useState();

  //Переводим в единый формат
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  //окончания
  function endingKeyword(n) {
    return (n % 10 === 1 && n % 100 !== 11 ? '-а' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? '-м' : '-и');
  }

  //сортируем по ключевым словам
  function sortByKeyword(arr) {
    const count = {};

    arr.forEach(function (value) { count[value] = 0; });

    const uniques = arr.filter(function (value) {
      return ++count[value] === 1;
    });

    return uniques.sort(function (a, b) {
      return count[b] - count[a];
    });
  }

  //при изменении новостей, меняем текст 
  useEffect(() => {
    let keyword = sortByKeyword(articles.map(article => capitalize(article.keyword)));

    keyword.length === 1 ?
      setKeywordsSort(keyword[0])
      :
      keyword.length === 2 ?
        setKeywordsSort(` ${keyword[0]} и ${keyword[1]}`)
        :
        keyword.length === 3 ?
          setKeywordsSort(` ${keyword[0]}, ${keyword[1]} и ${keyword[2]}`)
          :
          setKeywordsSort(` ${keyword[0]}, ${keyword[1]} и ${keyword.length - 2}${endingKeyword(keyword.length - 2)} другим`);

  }, [articles]);



  return (
    <section className="savenews">
      <div className="savenews__square">
        <span className="savenews__header">Сохранённые статьи</span>
        <h1 className="savenews__title">{`${currentUser.name} , у вас  ${articles.length} сохранённых статей`}</h1>
        {articles.length === 0 ? null
          :
          <span className="savenews__subtitle">По ключевым словам: <b className="savenews__subtitle">{keywordsSort}</b></span>
        }
      </div>
    </section>
  );
}

export default TitleSavedNews;
