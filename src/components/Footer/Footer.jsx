import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-box">
          <div className="logo-site">
            <Link to='/' className='logo'>
                <img src="./images/logo.png" alt="logo_site" />
                Куда Пицца
            </Link>
          </div>
          <div className="footer-link">
            <b>Куда пицца</b>
            <ul>
              <li>
                <Link>О компании</Link>
              </li>
              <li>
                <Link>Пользовательское соглашение</Link>
              </li>
              <li>
                <Link>Условия гарантии</Link>
              </li>
            </ul>
          </div>
          <div className="footer-link">
            <b>Помощь</b>
            <ul>
              <li>
                <Link>Ресторан</Link>
              </li>
              <li>
                <Link>Контакты</Link>
              </li>
              <li>
                <Link>Поддержка</Link>
              </li>
              <li>
                <Link>Отследить заказ</Link>
              </li>
            </ul>
          </div>
          <div className="footer-link">
            <b>Контакты</b>
            <div className="call">
                  <Link to='tel:+7 (926) 223-10-11' className="icons">
                      <i className="fa-solid fa-phone"></i>
                      +7 (926) 223-10-11
                  </Link>
                  <Link className="icons">
                      <i className='fa-solid fa-location-dot'></i>
                      Москва, ул. Юных Ленинцев, д.99
                  </Link>
                  <div className="nets">
                      <Link className="icons">
                          <i className="fa-brands fa-facebook"></i>
                          Facebook
                      </Link>
                      <Link className="icons">
                          <i className="fa-brands fa-instagram"></i>
                          Instagram
                      </Link>
                  </div>
            </div>
          </div>
        </div>
        <div className="porduction">
          © Copyright 2021 — Куда Пицца
        </div>
      </div>
    </footer>
  )
}

export default Footer