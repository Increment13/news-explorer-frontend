import React from 'react';

import TitleSavedNews from './TitleSavedNews';
import NewsSavedCardList from './NewsSavedCardList';
import NotFoundResult from './NotFoundResult'

function SavedNews({
    loggedIn,
    isSavedPath,
    onSetArticles,
    savedArticles,
    handleSaveArticles,
    handleDeleteArticles
}) {
    return (
        <>
            <TitleSavedNews
                articles={savedArticles}
            />
            {savedArticles.length > 0 && (
                <NewsSavedCardList
                    loggedIn={loggedIn}
                    isSavedPath={isSavedPath}
                    articles={savedArticles}
                    onSetArticles={onSetArticles}


                    handleSaveArticles={handleSaveArticles}
                    handleDeleteArticles={handleDeleteArticles}
                />
            )}
            {savedArticles.length === 0 &&
                <NotFoundResult
                    isSavedPath={isSavedPath}
                />}

        </>
    );
}

export default SavedNews;
