import React, {useEffect} from "react";

function NewsCard({
    loggedIn,
    isSavedPath,
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    idSavedArticle,
    handleDeleteArticles,
    handleSaveArticles
}) {

    const [isFocus, setIsFocus] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);

    useEffect(() => {
        if(!isSavedPath && idSavedArticle!=='')
        setIsSaved(true);
      }, []);

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
        handleSaveArticles({
            keyword: keyword,
            title: title,
            text: text,
            date: date,
            source: source,
            link: link,
            image: image
        });
        setIsSaved(true);
    }

    function handleDelete() {
        handleDeleteArticles(idSavedArticle);
        setIsSaved(false);
    }

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

    return (
        <>
            <div className="elements__image-container">
                {isSavedPath ?
                    <>
                        <div  className="elements__bannerSubject">{capitalize(keyword)}</div>
                        <div className={`elements__bannerSaved ${(isFocus) ? 'elements__bannerSaved_active' : ''}`}>Убрать из сохранённых</div>
                        <button id="savedpath" className="elements__banner elements__banner_delete" onMouseOver={onBannerFocus} onClick={handleDelete}></button>
                    </>
                    :
                    !loggedIn ?
                        <>
                            <div  className={`elements__bannerSaved ${isFocus ? 'elements__bannerSaved_active' : ''}`}>Авторизуйтесь, чтобы сохранять статьи</div>
                            <button id="nonauth" className="elements__banner  elements__banner_save" onMouseOver={onBannerFocus}></button>
                        </>
                        :
                        isSaved ?
                            <>
                                <button id="mainpathdel" className="elements__banner elements__banner_saved" onMouseOver={onBannerFocus} onClick={handleDelete}></button>
                            </>
                            :
                            <button id="mainpathsave" className="elements__banner elements__banner_save" onMouseOver={onBannerFocus} onClick={handleSave}></button>
                }
                <img className="elements__image" src={image} alt="фото новости" />
            </div>
            <div className="elements__info">
                <div className="elements__date">{createDate(date)}</div>
                <h3 className="elements__titile">{title}</h3>
                <p className="elements__description">{text}</p>
                <p className="elements__source">{source}</p>
            </div>
        </>
    );
}

export default NewsCard;