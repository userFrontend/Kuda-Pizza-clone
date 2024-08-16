import React from 'react'
import './Basket.scss'
import Layout from '../Layout/Layout'
import { useInfoContext } from '../../context/infoContext'
import { Link } from 'react-router-dom'
import { toast } from '../Message/ToastContainer'

const Basket = () => {
    const {toggleBasket, count, dispatch, state, setOrders, orders} = useInfoContext()

    const handleBasket = () => {
            localStorage.setItem('order', JSON.stringify(state.items));
            toggleBasket()
            setOrders(state.items)
      };

  return (
    <div>
        <Layout toggle={toggleBasket} title={'Ваш заказ'}>
            <div className="baskets">
                <div className="basket-items">
                    {state.items.map(item => (
                    <div key={item.id} className="basket-item">
                        <img src={item.image.url} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            {item.extras.map(res => {
                                return <span key={res} style={{fontSize: '12px', marginRight: '5px', color: '#8080809f'}}>{res},</span>
                            })}
                            <p>{item.crust} {item.size && `, ${item.size} см`}</p>
                            <div className="item-set">
                                <div className="item-quantity">
                                    <button onClick={() => {dispatch({ type: 'DECREASE', id: item.id })}}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch({ type: 'INCREASE', id: item.id })}>+</button>
                                </div>
                                <div className="item-price">{item.totalPrice * item.quantity} ₽</div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="basket-footer">
                    <div className="total-price">Итого: {count} ₽</div>
                    {count > 0 ? <Link to='/order'><button className="btn" onClick={() => {handleBasket()}}>Оформить заказ</button></Link> : toast('Продукт еще не выбран', 'warning')}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Basket