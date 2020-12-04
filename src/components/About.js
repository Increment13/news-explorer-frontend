import React from 'react';
import photoauthor from '../images/fotoautor.jpg';

function About() {
  return (
    <section className="about-autor">
    <div className="about-autor__square">
        <img className="about-autor__photo" src={photoauthor} alt="фотография автора"/>
        <div>
            <h2 className="about-autor__title">Об авторе</h2>
            <p className="about-autor__subtitle">Привет! Меня зовут Таланов Александр, я веб-разработчик. Создаю адаптивные приложения на React + Express.js </p>
            <p className="about-autor__subtitle">
                За время обучения в практикуме Практикуме научился не только  <s>ш</s>кодить но и писать качественный и оптимизированный код. Любая задача решаема, главное правльно искать решение.</p>
        </div>
    </div>
</section>
  );
}

export default About;
