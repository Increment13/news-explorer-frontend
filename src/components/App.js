import React, { useEffect, useState } from 'react';

import Main from './Main';
import AuthPopup from './AuthPopup';
import RegistrationPopup from './RegistrationPopup';

import Footer from './Footer';
import InfoPopup from './InfoPopup';
import Header from './Header';
import Burger from './Burger';

import CurrentUserContext from "../contexts/CurrentUserContext";
import { useHistory } from 'react-router-dom';
import '../index.css';
import * as auth from '../api/AuthApi.js';
import * as mainapi from '../api/MainApi.js';

function App() {

  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundResult, setIsNotFoundResult] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState();
  const [isSavedPath, setIsSavedPath] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const history = useHistory();

  //загрузка карточек (если пользователь залогинен)
  React.useEffect(() => {
    if (loggedIn) {
      //проверяем логин, что б зря не обращаться 
      mainapi.getRequest().then((data) => {
        setSavedArticles([...data]);
      }).catch((err) => console.error(err));
    }
  }, [loggedIn]);

  //Сохранение новой карточки
  function handleSaveArticles(data) {
    mainapi.postRequest({
      keyword: data.keyword,
      title: data.title,
      text: data.text,
      date: data.date,
      source: data.source,
      link: data.link,
      image: data.image
    })
      .then((newArticle) => {

        setSavedArticles([...savedArticles, newArticle]);

        const newLocalArticles = articles.map((art) =>
          art.url === data.link
            ?
            { ...art, _id: newArticle._id }
            : art);

          localStorage.setItem("articles", JSON.stringify(newLocalArticles));
          setArticles(JSON.parse(localStorage.getItem("articles")));

      })
      .catch((err) => console.error(err));
  }

  //Удаление карточки
  function handleDeleteArticles(deleteId) {
    mainapi
      .deleteRequest(deleteId)
      .then(() => {
        const newArticles = savedArticles.filter((c) => c._id !== deleteId);
        setSavedArticles(newArticles);

        const newLocalArticles = articles.map((art) =>
          art._id === deleteId
            ?
            { ...art, _id: '' }
            : art);

            localStorage.setItem("articles", JSON.stringify(newLocalArticles));
            setArticles(JSON.parse(localStorage.getItem("articles")));

      })
      .catch((err) => console.log(err));
  }

  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getUser(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
        }
      });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  //если есть выгруженные новости
  useEffect(() => {
    if (localStorage.getItem('articles')) {
      setArticles(JSON.parse(localStorage.getItem('articles')));
      setIsResult(true);
    }
  }, []);

  //закрытие всех попапов
  function closeAllPopups() {
    setIsAuthPopupOpen(false);
    setIsRegPopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsBurgerOpen(false);
    document.body.classList.remove('body_noScroll');
  }

  //открытие попапа успешно зарегестрирован
  function handleInfoOpen() {
    setIsInfoPopupOpen(true);
  }

  //открытие бургера и отключние скрола 
  function handleBurgerOpen() {
    setIsBurgerOpen(true);
    document.body.classList.add('body_noScroll');
  }

  //закрыть поапов по Esc
  function handleKeyDownEsc(e) {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  }

  //открытие попапа авторизации
  function handleAuthPopupOpen() {
    setIsAuthPopupOpen(true);
  }

  //переход с инфо в авторизацию
  function handleInfoClose() {
    setIsInfoPopupOpen(false);
    setIsAuthPopupOpen(true);
  }

  //свич между регистрацией и авторизацией
  function handleSwitchPopupOpen() {
    setIsRegPopupOpen(!isRegPopupOpen);
    setIsAuthPopupOpen(!isAuthPopupOpen);
  }

  //переход по страницам
  function changePath(bool) {
    setIsSavedPath(bool);
  }

  //выход 
  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('articles');

    setLoggedIn(false);
    setIsSavedPath(false);
    history.push('/');
  }

  //авторизация пользователя
  const onAuth = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }

        if (data.jwt && data.data) {
          setLoggedIn(true);
        }
      });
  };

  function hadleLogin() {
    setLoggedIn(true);
    history.push('/');
  }

  //вход на /saved-news, если сохранен jwt пускаем
  useEffect(() => {
    if (window.location.pathname === '/saved-news') {

      if (!loggedIn) {
        let jwt = localStorage.getItem('jwt');
        auth
          .getUser(jwt)
          .then((res) => {
            if (res._id) {
              setCurrentUser(res);
              setIsSavedPath(true);
              history.push('/saved-news');
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);



  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onAuthPopupOpen={handleAuthPopupOpen}
          loggedIn={loggedIn}
          signOut={signOut}
          changePath={changePath}
          isSavedPath={isSavedPath}
          isBurgerOpen={isBurgerOpen}
          onBurgerOpen={handleBurgerOpen}
          onClose={closeAllPopups}
          isAuthPopupOpen={isAuthPopupOpen}
          isRegPopupOpen={isRegPopupOpen}
          isInfoPopupOpen={isInfoPopupOpen}
        />
        <Main
          currentUser={currentUser}
          loggedIn={loggedIn}
          signOut={signOut}
          onClose={closeAllPopups}

          onSetIsLoading={setIsLoading}
          onSetIsNotFoundResult={setIsNotFoundResult}
          onSetIsResult={setIsResult}
          onSetArticles={setArticles}

          isLoading={isLoading}
          isNotFoundResult={isNotFoundResult}
          isResult={isResult}
          articles={articles}

          isBurgerOpen={isBurgerOpen}
          onBurgerOpen={handleBurgerOpen}

          onAuthPopupOpen={handleAuthPopupOpen}
          isAuthPopupOpen={isAuthPopupOpen}
          isRegPopupOpen={isRegPopupOpen}
          isInfoPopupOpen={isInfoPopupOpen}

          isSavedPath={isSavedPath}
          savedArticles={savedArticles}

          handleSaveArticles={handleSaveArticles}
          handleDeleteArticles={handleDeleteArticles}
        />
        <Burger
          isBurgerOpen={isBurgerOpen}
          onClose={closeAllPopups}
          changePath={changePath}
          onAuthPopupOpen={handleAuthPopupOpen}
          loggedIn={loggedIn}
          signOut={signOut}
        />
        <AuthPopup
          onAuth={onAuth}
          hadleLogin={hadleLogin}
          isOpen={isAuthPopupOpen}
          onClose={closeAllPopups}
          onSwitchPopupOpen={handleSwitchPopupOpen}
          onDownEsc={handleKeyDownEsc}
        />
        <RegistrationPopup
          isOpen={isRegPopupOpen}
          onClose={closeAllPopups}
          onSwitchPopupOpen={handleSwitchPopupOpen}
          onDownEsc={handleKeyDownEsc}
          handleInfoOpen={handleInfoOpen}
        />
        <InfoPopup
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          onInfoClose={handleInfoClose}
          onDownEsc={handleKeyDownEsc}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
