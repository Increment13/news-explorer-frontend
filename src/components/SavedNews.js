import React from 'react';
import Header from './Header';
import TitleSavedNews from './TitleSavedNews';
import NewsCardList from './NewsCardList';
import NotFoundResult from './NotFoundResult'

function SavedNews({ onAuthPopupOpen,
    loggedIn,
    signOut,
    isSavedPath,
    articles,
    changePath,
    onSetArticles,
    isSaveCard,
    isBurgerOpen,
    onBurgerOpen,
    onClose,
    isAuthPopupOpen, 
    isRegPopupOpen, 
    isInfoPopupOpen }) {
    return (
        <>
            <Header
                onAuthPopupOpen={onAuthPopupOpen}
                loggedIn={loggedIn}
                signOut={signOut}
                isSavedPath={isSavedPath}
                changePath={changePath}

                isBurgerOpen={isBurgerOpen}
                onBurgerOpen={onBurgerOpen}
                onClose={onClose}

                isAuthPopupOpen={isAuthPopupOpen}
                isRegPopupOpen={isRegPopupOpen}
                isInfoPopupOpen={isInfoPopupOpen}
            />
            <TitleSavedNews
                articles={articles}
            />
            {isSaveCard && (
                <NewsCardList
                    loggedIn={loggedIn}
                    isSavedPath={isSavedPath}
                    articles={articles}
                    onSetArticles={onSetArticles}
                />
            )}

            {!isSaveCard && <NotFoundResult
                isSavedPath={isSavedPath}
            />}

        </>
    );
}

export default SavedNews;
