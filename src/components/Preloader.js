import React from "react";
import imgCycle from "../images/cycle.png";

const Preloader = () => {
    return (
        <section className="result">
            <div className="result__pool-searching">
                <img className="result__searching_image" src={imgCycle} alt="идет поиск" />
                <span className="result__searching">Идет поиск новостей...</span>
            </div>
        </section>
    );
};

export default Preloader;
