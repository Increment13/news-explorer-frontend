import React from "react";

function NewsCard({
    loggedIn,
    isSavedPath,
    article
}) {

    const [isFocus, setIsFocus] = React.useState(false);

    function createDate(date) {
        const months = {
            1: "января",
            2: "февраля",
            3: "марта",
            4: "апреля",
            5: "мая",
            6: "июня",
            7: "июля",
            8: "августа",
            9: "сентября",
            10: "октября",
            11: "ноября",
            12: "декабря",
        };
        const arr = date.split("T")[0].split("-");
        const year = arr[0];
        const month = arr[1];
        const day = arr[2];

        return `${day} ${months[month]}, ${year}`;
    }

    function onBannerFocus() {
        setIsFocus(true);
        setTimeout(() => {
            setIsFocus(false);
        }, 1500);
    }

    function handleSave() {
        console.log('save');
    }

    function handleDelete(){
        console.log('delete');    
    }

    return (
        <>
            <div className="elements__image-container">
                {!isSavedPath ?
                    <>
                        <div className="elements__bannerSubject">subject</div>
                        <div className={`elements__bannerSaved ${(isFocus) ? 'elements__bannerSaved_active' : ''}`}>Убрать из сохранённых</div>
                        <button className="elements__banner elements__banner_delete" onMouseOver={onBannerFocus} onClick={handleDelete}></button>
                    </>
                    :
                    !loggedIn ?
                        <>
                            <div className={`elements__bannerSaved ${isFocus ? 'elements__bannerSaved_active' : ''}`}>Авторизуйтесь, чтобы сохранять статьи</div>
                            <button className="elements__banner  elements__banner_save" onMouseOver={onBannerFocus}></button>
                        </>
                        :
                        <button className="elements__banner elements__banner_save" onMouseOver={onBannerFocus} onClick={handleSave}></button>
                }
                <img className="elements__image" src={article.urlToImage} alt="фото новости" />
            </div>
            <div className="elements__info">
                <div className="elements__date">{createDate(article.publishedAt)}</div>
                <h3 className="elements__titile">{article.title}</h3>
                <p className="elements__description">{article.description}</p>
                <p className="elements__source">{article.source.name}</p>
            </div>
        </>
    );
}

export default NewsCard;

