import React, { useState } from 'react'
import './CardHistory.scss'

const CardHistory = ({item}) => {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
  return (
    <div className="order">
        <div className="order-info">
            <div className="info" style={item?.status === 'processing' ? {borderColor: 'red '}: item?.status === 'coming' ? {borderColor: '#FF7010'} : item?.status === 'completed' ? {borderColor: 'green'} : item?.status === 'canceled' && {borderColor: '#8080809f'}}>
                <div className="number-order">
                    <div>
                        <p>Заказ</p>
                        <h4>№130312 <span>{new Date(item?.createdAt).toLocaleDateString()}</span></h4>
                    </div>
                </div>
                <div className="price-order">
                    <p>Сумма заказа</p>
                    <h4>{item?.totalPrice} ₽</h4>
                </div>
                <div className="status">
                    <p>Статус</p>
                    <h4>{item?.status === 'processing' ? 'Обрабатывается' : item?.status === 'coming' ? `Едет к вам (в 15:13)` : item?.status === 'completed' ? 'Выполнен' : item?.status === 'canceled' && 'Отмена'}</h4>
                </div>
                <div className="pay">
                    <p>Оплачено</p>
                    <h4>{item?.payment}</h4>
                </div>
            </div>
            <div className='chevron' onClick={toggle}>
                {open ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
            </div>
        </div>
        <div className="order-location">
            <h4>{item?.street && `ул. ${item?.street},`} {item?.home && `${item?.home},`} {item?.floor && `${item?.floor} этаж,`} {item?.intercom && `домофон ${item?.intercom},`}</h4>
            <div className="order-box" style={item.status === 'canceled' ? {filter: 'grayscale(1)'} : {filter: 'none'}}>
                {JSON.parse(item.orders).map(img => {
                    console.log(img.image.url);
                    return <img src={img?.image?.url} alt="photo" />
                })}
            </div>
        </div>
        {open && <div className="prods">
            {JSON.parse(item.orders).map(res => {
                return <div className="prod">
                <div className="prod-img">
                    <img src={res.image.url} alt="prod_img" />
                    <h3 className="prod-title">{res.name}</h3>
                </div>
                <h4>{res.crust}{res.size && `, ${res.size} см`} <br />{res.extras.map(res => {
                    return <span key={res} style={{fontSize: '12px', marginRight: '5px', color: '#8080809f'}}>{res},</span>
                })}</h4>
                <div className="count-price">
                    <div className="prod-count">{res.quantity} товар</div>
                    <b className="price">{res.totalPrice} ₽</b>
                </div>
           </div>
            })}
           <div className="prod-btn">
                <button>Повторить заказ</button>
           </div>
        </div>}
    </div>
  )
}

export default CardHistory