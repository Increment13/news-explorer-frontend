import React from "react";
import imgNotFound from "../images/not-found_v1.svg";

const NotFoundResult = ({ isSavedPath }) => {
    return (
        <section className="result">
            <div className="result__not-found">
                <img className="result__not-found_image" src={imgNotFound} alt="ничего не найдено" />
                <h3 className="result__title_not-found">Ничего не найдено</h3>
                <span className="result__subtitle_not-found">{!isSavedPath ? 'К сожалению по вашему запросу ничего не найдено.' : 'У Вас еще нет сохраненных новостей.'}</span>
            </div>
        </section>
    );
};

export default NotFoundResult;
