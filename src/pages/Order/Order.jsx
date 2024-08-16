import React, { useEffect, useState } from 'react'
import './Order.scss'
import { useInfoContext } from '../../context/infoContext'
import { addProd } from '../../api/addRequest'
import { getOneProd } from '../../api/getRequest'
import { toast } from '../../components/Message/ToastContainer'
import { v4 as uuidv4 } from 'uuid'
import Slider from 'react-slick'

const Order = () => {
    const {state, dispatch, count, currentUser, setCurrentUser, cards, categorys} = useInfoContext()
    const [location, setLocation] = useState(false)
    const [order, setOrder] = useState('');
    const [payment, setPayment] = useState('');
    const [change, setChange] = useState('');
    const [changeValue, setChangeValue] = useState('');

    const handleChange = (prod) => {
        const newProd = {
            ...prod,
              id: uuidv4(),
              quantity: 1,
              totalPrice: prod.price,
          }
        dispatch({ type: 'ADD_ITEM', item: [newProd] });
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            data.append('authorId', currentUser._id);
            data.append('totalPrice', count);
    
            const orders = JSON.stringify(JSON.parse(localStorage.getItem("order")));
            data.append('orders', orders);
            await addProd(data, 'history');
            const res = await getOneProd(currentUser._id, 'user');
            setCurrentUser(res.data.user[0])
            localStorage.setItem("profile", JSON.stringify(res?.data?.user[0]))
            dispatch({ type: 'RESET' });
            localStorage.removeItem('order')
            toast('Order successfully added', 'success');
        } catch (error) {
            console.log(error);
            toast(error.message, 'error');
        }
    };

    useEffect(()=>{
        if(state.items.length <= 0){
            window.location.replace('/')
        }
    },[state])

  return (
    <div className="container">
        <div className='order-page'>
        <h2>Ваш заказ</h2>
        <div className="order-box">
            {state.items.map(item => (
                <div key={item.id} className="order-item">
                    <div className="item-img">
                        <img src={item.image.url} alt={item.name} />
                        <div>
                            <h3>{item.name}</h3>
                            {item.extras.map(res => {
                                return <span key={res} style={{fontSize: '12px', marginRight: '5px', color: '#8080809f'}}>{res},</span>
                            })}
                            <p>{item.crust}{item.size && `, ${item.size} см`}</p>
                        </div>
                    </div>
                    <div className="item-set">
                        <div className="item-quantity">
                            <button onClick={() => dispatch({ type: 'DECREASE', id: item.id })}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => dispatch({ type: 'INCREASE', id: item.id })}>+</button>
                        </div>
                        <div className="item-price">{item.totalPrice * item.quantity} ₽</div>
                    </div>
                </div>
            ))}
        </div>
        <div className="promocode">
            <label htmlFor="">
                <input type="text" name='promocode' placeholder='Промокод'/>
                <button><i className='fa-solid fa-arrow-right'></i></button>
            </label>
            <div className="total-price">Итого: {count} ₽</div>
        </div>
        <h3 className='more'>Добавить к заказу?</h3>
        <div className="get-item">
            <Slider className='carousel' adaptiveHeight={300} responsive= { [
                 {
                    breakpoint: 540,
                    dots: true,
                    infinite: false,
                    speed: 1000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    },
                    {
                    breakpoint: 768,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 1000,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                    },
                    {
                    breakpoint: 1260,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 1000,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                    },
                    {
                    breakpoint: 1600  ,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 1000,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                }
            ]}>
                {cards.map(res => {
                    const filtered = categorys.filter(item => item.name === 'Закуски')[0]
                    if(res.categoryId === filtered._id){
                        return (
                            <div className='add-card' key={res._id}>
                                <div className="add-img">
                                    <img src={res.image.url} alt="photo" />
                                </div>
                                <div className="add-content">
                                    <div>
                                        <h2>{res.name}</h2>
                                        <span>Порция 95 г</span>
                                    </div>
                                    <button className='btn' onClick={() => handleChange(res)}>{res.price} ₽</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </Slider>
        </div>
        <h3 className='more'>Соусы</h3>
        <div className="get-item">
            <Slider className='carousel' adaptiveHeight={300} responsive= { [
                {
                    breakpoint: 540,
                    dots: true,
                    infinite: false,
                    speed: 1000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    },
                    {
                    breakpoint: 768,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 1000,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                    },
                    {
                    breakpoint: 1260,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 1000,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                    },
                    {
                    breakpoint: 1600  ,
                    settings: {
                        dots: false,
                        infinite: false,
                        speed: 1000,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                }
            ]}>
                {cards.map(res => {
                    const filtered = categorys.filter(item => item.name === 'Соусы')[0]
                    if(res.categoryId === filtered._id){
                        return (
                            <div className='add-card' key={res._id}>
                                <div className="add-img">
                                    <img src={res.image.url} alt="photo" />
                                </div>
                                <div className="add-content">
                                    <div>
                                        <h2>{res.name}</h2>
                                    </div>
                                    <button className='btn' onClick={() => handleChange(res)}>{res.price} ₽</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </Slider>
        </div>
        <form onSubmit={handleAdd} className="get-info">
            <h3 className='more'>О вас</h3>
            <div className="user-info">
                <label htmlFor="name">
                    <span>Имя*</span>
                    <input minLength={3} name='name' id='name' type="text" defaultValue={currentUser.name} required/>
                </label>
                <label htmlFor="phone">
                    <span>Номер телефона*</span>
                    <input minLength={8} name='phone' id='tel' type="tel" defaultValue={currentUser.phoneNumber} required/>
                </label>
                <label htmlFor="email">
                    <span>Почта</span>
                    <input minLength={10} name='email' id='email' type="email" defaultValue={currentUser.email}/>
                </label>
            </div>
            <div className="type">
                <h3 className="more">Доставка</h3>
                <div>
                    <button className={!location ? "active-btn" : ""} onClick={() => setLocation(false)}>Доставка</button>
                    <button className={location ? "active-btn" : ""} onClick={() => setLocation(true)}>Самовывоз</button>
                </div>
            </div>
            <div className="get-location">
                {!location ? 
                <div>
                    <label htmlFor="">
                        <p>Улица*</p>
                        <input name='street' type="text" placeholder='Пушкина' required/>
                    </label>
                    <div className="address">
                        <label htmlFor="">
                            <span>Дом</span>
                            <input name='home' type="text" placeholder='1а'/>
                        </label>
                        <label htmlFor="">
                            <span>Подъезд</span>
                            <input name='entrance' type="text" placeholder='1'/>
                        </label>
                        <label htmlFor="">
                            <span>Этаж</span>
                            <input name='floor' type="text" placeholder='2'/>
                        </label>
                        <label htmlFor="">
                            <span>Квартира</span>
                            <input name='apartment' type="text" placeholder='3'/>
                        </label>
                        <label htmlFor="">
                            <span>Домофон</span>
                            <input name='intercom' type="text" placeholder='0000'/>
                        </label>
                    </div>
                </div>
                :<label htmlFor="">
                    <p>Ресторан*</p>
                    <input name='home' type="text" placeholder='Выберите ресторан' required/>
                </label>}
            </div>
            <p>Когда выполнить заказ?</p>
            <div className="get-for">
                <label htmlFor="times">
                <input
                    name="order"
                    id="times"
                    value="Как можно скорее"
                    type="radio"
                    checked={order === 'Как можно скорее'}
                    onChange={(e) => setOrder(e.target.value)}
                />
                Как можно скорее
                </label>
                <label htmlFor="time">
                <input
                    name="order"
                    id="time"
                    value="По времени"
                    type="radio"
                    checked={order === 'По времени'}
                    onChange={(e) => setOrder(e.target.value)}
                />
                По времени
                </label>
                <input type="date" />
            </div>
            <h3 className="more">Оплата</h3>
            <div className="pay">
                <label>
                <input
                    type="radio"
                    name="payment"
                    value="Наличными"
                    checked={payment === 'Наличными'}
                    onChange={(e) => setPayment(e.target.value)}
                />
                Наличными
                </label>
                <label>
                <input
                    type="radio"
                    name="payment"
                    value="Картой"
                    checked={payment === 'Картой'}
                    onChange={(e) => setPayment(e.target.value)}
                />
                Картой
                </label>
                <label>
                <input
                    type="radio"
                    name="payment"
                    value="Apple Pay"
                    checked={payment === 'Apple Pay'}
                    onChange={(e) => setPayment(e.target.value)}
                />
                Apple Pay
                </label>
            </div>
            <h3 className="more">Сдача</h3>
            <div className="pay">
                <label>
                <input
                    type="radio"
                    name="change"
                    value="Без сдачи"
                    checked={change === 'Без сдачи'}
                    onChange={(e) => setChange(e.target.value)}
                />
                Без сдачи
                </label>
                <label>
                <input
                    type="radio"
                    name="change"
                    value="Сдача с"
                    checked={change === 'Сдача с'}
                    onChange={(e) => setChange(e.target.value)}
                />
                Сдача с
                </label>
                <label className="price">
                <input
                    type="number"
                    placeholder="0"
                    name="changeValue"
                    value={changeValue}
                    onChange={(e) => setChangeValue(e.target.value)}
                />
                ₽
                </label>
            </div>
            <div className="comment">
                <h3 className="more">Комментарий</h3>
                <textarea name="comment" placeholder='Есть уточнения?'></textarea>
            </div>
            <div className="promocode">
                <div className="total-price">Итого: {count} ₽</div>
                <button className='btn'>Оформить заказ</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Order