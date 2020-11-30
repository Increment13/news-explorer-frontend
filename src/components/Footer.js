import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <span className="content__copyright">© 2020 Supersite, Powered by News API</span>
      <nav className="footer__columns">
        <nav className="footer__content_info">
          <Link className="footer__link" to="#">Главная</Link>
          <Link className="footer__link" to="https://praktikum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
        </nav>
        <nav className="footer__content_social">
          <Link className="footer__link" to="https://www.facebook.com/alexandr.talanov.3" target="_blank">
            <div className="footer__social-icon footer__social-icon_icon_fb"></div>
          </Link>
          <Link className="footer__link" to="https://github.com/Increment13" target="_blank">
            <div className="footer__social-icon footer__social-icon_icon_git"></div>
          </Link>
        </nav>


      </nav>
    </footer>

  );
}

export default Footer;
