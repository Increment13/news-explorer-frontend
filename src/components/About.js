import React from 'react';
import photoauthor from '../images/fotoautor.jpg';

function About() {
  return (
    <section className="about-autor">
    <div className="about-autor__square">
        <img className="about-autor__photo" src={photoauthor} alt="фотография автора"/>
        <div>
            <h2 className="about-autor__title">Об авторе</h2>
            <p className="about-autor__subtitle">Это блок с описанием автора проекта. Здесь следует указать, как вас
                зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
            <p className="about-autor__subtitle">
                Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете
                помочь
                потенциальным заказчикам.</p>
        </div>
    </div>
</section>
  );
}

export default About;
