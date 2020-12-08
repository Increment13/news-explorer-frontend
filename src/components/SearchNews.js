import React from 'react';
import SearchForm from './SearchForm';

import About from './About';
import Preloader from './Preloader';
import NewsCardList from './NewsCardList';
import NotFoundResult from './NotFoundResult';
  
function SearchNews({
  loggedIn,
  onSetIsLoading,
  onSetIsNotFoundResult,
  onSetIsResult,
  onSetArticles,
  isLoading,
  isNotFoundResult,
  isResult,
  isSavedPath,
  articles,
  handleSaveArticles,
  handleDeleteArticles,
  savedArticles
}) {  
  return (
    <>
      <SearchForm
        onSetIsLoading={onSetIsLoading}
        onSetIsNotFoundResult={onSetIsNotFoundResult}
        onSetIsResult={onSetIsResult}
        onSetArticles={onSetArticles}
        savedArticles={savedArticles}

        loggedIn={loggedIn}
      />
      {isResult && (
        <NewsCardList
          loggedIn={loggedIn}
          isSavedPath={isSavedPath}
          articles={articles}
          onSetArticles={onSetArticles}

          handleSaveArticles={handleSaveArticles}
          handleDeleteArticles={handleDeleteArticles}
        />
      )}
      {isLoading && <Preloader />}
      {isNotFoundResult && <NotFoundResult
        isSavedPath={isSavedPath} />}
      <About />
    </>
  );
}

export default SearchNews;
