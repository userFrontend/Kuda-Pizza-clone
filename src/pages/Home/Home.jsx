import React, { useState } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import { useInfoContext } from '../../context/infoContext'
import Title from '../../components/Title/Title'
import Card from '../../components/Card/Card'
import PizzaModal from '../../components/PizzaModal/PizzaModal'

const Home = () => {
    const {modalToggle, modal, cards, categorys} = useInfoContext()

  return (
    <main>
        <section>
            <div className="container">
                <div className="navbars">
                    <ul>
                        {categorys.length > 0 && categorys.map(res => {
                            return(
                                <li key={res._id}>
                                    <Link to={`/prod/${res._id}`}>
                                        <img src={res.image.url} alt="link_photo" />
                                        {res.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="combos">
                    <div className="box-combo">
                        3 средние пиццы от 999 рублей
                    </div>
                    <div className="box-combo">
                        Кэшбек 10% на самовывоз (доставка)
                    </div>
                    <div className="box-combo">
                        3 средние пиццы от 999 рублей
                    </div>
                    <div className="box-combo">
                        Кэшбек 10% на самовывоз (доставка)
                    </div>
                </div>
                <div className="location-inp">
                    <p>Проверить адрес доставки</p>
                    <label htmlFor="location">
                        <i className='fa-solid fa-location-dot'></i>
                        <input type="search" id='location' placeholder='Адрес'/>
                        <button className='btn media'><i style={{color: 'white'}} className="fa-solid fa-play"></i></button>
                    </label>
                    <button className='btn none'>Проверить</button>
                </div>
            </div>
        </section>
        <section>
            <div className="container">
                {categorys.length > 0 && categorys.filter(res => res.name !== 'Акции').map(res => {
                    return (
                        <div key={res._id}>
                            <Title text={res?.name} />
                            <div className="cards">
                                {cards?.map(item => {
                                    if(item.categoryId === res._id){
                                        return <Card key={item._id} prod={item}/>
                                    }
                                })}
                            </div>
                        </div>
                    )
                })}
                {modal && <PizzaModal/>}
            </div>
        </section>
        <div className="about">
            <h3>Доставка пиццы в Москве</h3>
            <p>
                Захотелось чего-то вкусного и сытного? Желание простое и понятное, только в холодильнике все не то, и до магазина идти лень. Все пропало? Нет. Недорого заказать пиццу в Москве очень просто! Вам на помощь спешит супергерой – Domino’s Pizza! Как у всякого супергероя, у Domino’s Pizza есть свои суперсилы: восхитительный вкус продукции из отборных ингредиентов; широкий ассортимент, включающий легендарные, фирменные и классические виды, для вегетарианцев и любителей экспериментировать; быстрая и бесплатная доставка пиццы в течение 30 минут, чтобы вкусное и ароматное блюдо не успевало остыть.
                Как сделать заказ
                Доставка пиццы от Domino’s – это когда Вам не нужно никуда ехать или звонить, ведь есть Интернет. Никогда еще заказ пиццы на дом в Москве не был таким простым! Чтобы заказать пиццу онлайн, Вам необходимо: выбрать понравившийся вариант и количество порций; положить желаемое в «Корзину»; не уходить далеко, так как вкусная пицца на заказ с доставкой уже мчится к Вам из ближайшей пиццерии Domino’s. И не забудьте оплатить заказ курьеру!
            </p>
        </div>
    </main>
  )
}

export default Home