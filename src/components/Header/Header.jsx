import React, { useState } from 'react'
import './Header.scss'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useInfoContext } from '../../context/infoContext'

const Header = () => {
    const {count, currentUser, exit, toggleBasket, state, categorys} = useInfoContext()
    const path = useLocation().pathname
    const [burger, setBurger] = useState(false)
    const [setting, setSetting] = useState(false)
    const toggleMenu = () => setBurger(!burger)
    const toggle = () => setSetting(!setting)

  return (
    <header>
        {path === '/' && <div className="header-top">
            <div className="container">
                <div className="location">
                    <div className="city">
                        <Link className='drop'><i className="fa-solid fa-location-dot"></i> Москва <img src="/images/arrow.png" alt="arrow" /></Link>
                        <Link className='none'>Проверить адрес</Link>
                        <Link className='none'>Среднее время доставки*: <strong>00:24:19</strong></Link>
                    </div>
                    <div className="account">
                        <Link className='media'>Среднее время доставки*: <strong>00:24:19</strong></Link>
                        <Link className='none'>Время работы: с 11:00 до 23:00</Link>
                        <Link to={!currentUser ? '/account' : ''} onClick={() => currentUser && toggle()} className='none'><i className="fa-regular fa-user"></i> {!currentUser && 'Войти в '} Аккаунт</Link>
                        {setting && currentUser && <div className="setting">
                            <ul>
                                <li>
                                    <Link>100 бонусов</Link>
                                </li>
                                <li>
                                    <Link to='/history'>История заказов</Link>
                                </li>
                                <li>
                                    <Link to='/account'>Настройки</Link>
                                </li>
                                {currentUser?.role === 'admin' && <li>
                                    <Link to='/add'>Добавить товар</Link>
                                </li>}
                                {currentUser?.role === 'admin' && <li>
                                    <Link to='/delete'>Удалить товар</Link>
                                </li>}
                                <li>
                                    <Link onClick={exit}>Выход из аккаунта</Link>
                                </li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        }
        <div className="container">
            <div className="header-link">
                <Link to='/' className='logo'>
                    <img src="/images/logo.png" alt="logo_site" />
                    <p className={path !== '/' ? 'none' : 'set'}>Куда Пицца</p>
                </Link>
                {path !== '/' && <div className='scroll-nav'>
                    <div className="navbars media">
                        <ul className='nav-icon'>
                            {categorys.length > 0 && categorys.map(item => {
                                return (
                                    <li key={item._id}>
                                        <Link to={`/prod/${item._id}`}>
                                            <img src={item.image.url} alt="link_photo" />
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <nav className='none'>
                        <ul>
                        {categorys.length > 0 && categorys.map(item => {
                                return (
                                    <li key={item._id}>
                                        <NavLink to={`/prod/${item._id}`}>{item.name}</NavLink>
                                    </li>
                                )
                            })}
                            <li>
                                <div style={{cursor: 'pointer'}} className='drop'>Другое <img src="/images/arrow.png" alt="arrow" /></div>
                            </li>
                        </ul>
                    </nav>
                </div>
                }
                {path === '/' && <div>
                    {burger ? 
                        <button className='close media' onClick={toggleMenu}>
                            <span>
                                <div className="close-bar"></div>
                            </span>
                        </button>
                        :
                        <button className='media hamburger' onClick={toggleMenu}>
                            <span>
                                <div className="bar"></div>
                            </span>
                        </button>
                        }
                </div>}
                <button onClick={toggleBasket} className='korzinka'>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <b className='count'>{state?.items?.length}</b>
                    <b className='price'>{count} <span>₽</span></b>
                </button>
            </div>
        </div>
        {burger && <div className='menu'>
            <div className="menu-info">
                <Link to='/account' className='menu-account' onClick={toggleMenu}><i className="fa-regular fa-user"></i> {!currentUser && 'Войти в '} Аккаунт</Link>
                {currentUser && <Link to='/add' className='menu-account' onClick={toggleMenu}><i className="fa-solid fa-plus"></i> Добавить товар</Link>}
                {currentUser && <Link className='menu-account' onClick={() => {toggleMenu(); exit()}}><i className="fa-solid fa-door-open"></i>Выход</Link>}
                <ul>
                    <li>
                        <Link>Акции</Link>
                    </li>
                    <li>
                        <Link>О компании</Link>
                    </li>
                    <li>
                        <Link>Пользовательское соглашение</Link>
                    </li>
                    <li>
                        <Link>Условия гарантии</Link>
                    </li>
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
                <div className="time">
                    Время работы: с 11:00 до 23:00
                </div>
            </div>
        </div>}
    </header>
  )
}

export default Header