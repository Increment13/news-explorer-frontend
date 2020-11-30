import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function TitleSavedNews() {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="savenews">
      <div className="savenews__square">
      <span className="savenews__header">Сохранённые статьи</span>
        <h1 className="savenews__title">{currentUser.name + `, у вас ` + `0` + ` сохранённых статей`}</h1>
        <span className="savenews__subtitle">По ключевым словам: <b className="savenews__subtitle">Природа, Тайга и 2-м другим</b></span>
      </div>
    </section>
  );
}

export default TitleSavedNews;
