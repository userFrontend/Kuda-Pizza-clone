import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import { useInfoContext } from '../../context/infoContext';
import { v4 as uuidv4 } from 'uuid'
import { toast } from '../Message/ToastContainer';

const PizzaModal = () => {
    const {modalToggle, modal, orders, prodId, setCount, count, state, dispatch} = useInfoContext()
    const [crust, setCrust] = useState('Традиционное');
    const [size, setSize] = useState(20);
    const [extras, setExtras] = useState([]);
    const [set, setSet] = useState([]);


    const basePrice = prodId?.price;
    const extraPrice = 59;

    const handleCrustChange = (event) => {
        setCrust(event.target.value);
    };

    const handleSizeChange = (event) => {
        setSize(parseInt(event.target.value, 10));
    };

    const handleSetChange = (extra) => {
        setSet((prevExtras) =>
        prevExtras.includes(extra)
            ? prevExtras.filter((item) => item !== extra)
            : [...prevExtras, extra]
        );
    };
    const handleExtraChange = (extra) => {
        setExtras((prevExtras) =>
        prevExtras.includes(extra)
            ? prevExtras.filter((item) => item !== extra)
            : [...prevExtras, extra]
        );
    };

    const handleSubmit = () => {
        const orderData = {
            ...prodId,
            id: uuidv4(),
            quantity: 1,
            crust,
            size,
            extras,
            set,
            totalPrice: basePrice + extras.length * extraPrice,
        };
        const item = [...orders, orderData];
        modalToggle()
        console.log(item);
        toast('Товар добавлен в корзину', 'info')
        dispatch({ type: 'ADD_ITEM', item });
        setCount(count + (basePrice + extras.length * extraPrice))
        localStorage.setItem('order', JSON.stringify(item));
    };

    const totalPrice = basePrice + extras.length * extraPrice;

  return (
    <div>
        {modal && <Modal toggle={modalToggle}>
            <div className="one-prod">
                <img className='prod-img' src={prodId?.image?.url} alt="photo" />
                <div className="prod-info">
                    <div className="top-info">
                        <div>
                            {/* <img src="/images/fire.png" alt="icon" /> */}
                            <p>{prodId?.name}</p>
                        </div>
                        <i className="fa-regular fa-circle-question"></i>
                    </div>
                    <div className="pizza-order">
                        <div className='order-one'>
                                <input type="checkbox" checked={set.includes('Моцарелла')}
                                onChange={() => handleSetChange('Моцарелла')} name='set' value='Моцарелла' readOnly id='set-one'/>  
                            <label htmlFor='set-one'>
                                <img src="/images/set1.png" alt="icon" />
                                Моцарелла
                            </label>
                                <input type="checkbox" checked={set.includes('Огурцы маринованные')}
                                onChange={() => handleSetChange('Огурцы маринованные')} name='cucumber' value='Огурцы маринованные' readOnly id='set-two'/>
                            <label htmlFor='set-two'>
                                <img src="/images/set2.png" alt="icon" />
                                Огурцы маринованные
                            </label>
                                <input type="checkbox" checked={set.includes('Пепперони')}
                                onChange={() => handleSetChange('Пепперони')} name='pepperoni' value='Пепперони' readOnly id='set-three'/>
                            <label htmlFor='set-three'>
                                <img src="/images/set3.png" alt="icon" />
                                Пепперони
                            </label>
                                <input type="checkbox" checked={set.includes('Томатный соус')}
                                onChange={() => handleSetChange('Томатный соус')} name='tomato' value='Томатный соус' readOnly id='set-four'/>
                            <label htmlFor='set-four'>
                                <img src="/images/set4.png" alt="icon" />
                                Томатный соус
                            </label>
                        </div>
                        <div className='order-two'>
                            <input
                                id='type'
                                name='type'
                                type="radio"
                                value="Традиционное"
                                checked={crust === 'Традиционное'}
                                onChange={handleCrustChange}
                            />
                            <label htmlFor='type'>
                                Традиционное
                            </label>
                            <input
                                id='types'
                                name='type'
                                type="radio"
                                value="Тонкое"
                                checked={crust === 'Тонкое'}
                                onChange={handleCrustChange}
                            />
                            <label htmlFor='types'>
                                Тонкое
                            </label>
                        </div>
                        <div className='order-three'>
                                <input id='size' type="radio" name='size' value={20} checked={size === 20} onChange={handleSizeChange}/>
                            <label htmlFor='size'>
                                20 см
                            </label>
                                <input id='size1' type="radio" name='size' value={28} checked={size === 28} onChange={handleSizeChange}/>
                            <label htmlFor='size1'>
                                28 см
                            </label>
                                <input id='size2' type="radio" name='size' value={33} checked={size === 33} onChange={handleSizeChange}/>
                            <label htmlFor='size2'>
                                33 см
                            </label>
                        </div>
                        <b>Добавьте в пиццу</b>
                        <div className='order-four'>
                            <input
                                id='four'
                                type="checkbox"
                                checked={extras.includes('Моцарелла')}
                                onChange={() => handleExtraChange('Моцарелла')}
                            />
                            <label htmlFor='four'>
                                <img src="/images/set1.png" alt="photo" />
                                Моцарелла 
                                <p>59 ₽</p>
                            </label>
                            <input
                                id='four1'
                                type="checkbox"
                                checked={extras.includes('Шампиньоны')}
                                onChange={() => handleExtraChange('Шампиньоны')}
                            />
                            <label htmlFor='four1'>
                                <img src="/images/four1.png" alt="photo" />
                                Шампиньоны 
                                <p>59 ₽</p>
                            </label>
                            <input
                                id='four2'
                                type="checkbox"
                                checked={extras.includes('Красный лук')}
                                onChange={() => handleExtraChange('Красный лук')}
                            />
                            <label htmlFor='four2'>
                                <img src="/images/four2.png" alt="photo" />
                                Красный лук 
                                <p>59 ₽</p>
                            </label>
                            <input
                                id='four3'
                                type="checkbox"
                                checked={extras.includes('Сладкий перец')}
                                onChange={() => handleExtraChange('Сладкий перец')}
                            />
                            <label htmlFor='four3'>
                                <img src="/images/four3.png" alt="photo" />
                                Сладкий перец  
                                <p>59 ₽</p>
                            </label>
                        </div>
                        <div className='order-end'>
                            <div className="price">
                                <h2>Итого: {totalPrice} ₽</h2>
                                <span>400 г</span>
                            </div>
                            <button onClick={handleSubmit}>Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>}
    </div>
  )
}

export default PizzaModal