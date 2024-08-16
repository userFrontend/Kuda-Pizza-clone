import React from 'react'
import './Card.scss'
import { useInfoContext } from '../../context/infoContext'
import { Link } from 'react-router-dom'
import { toast } from '../Message/ToastContainer'
import { v4 as uuidv4 } from 'uuid'

const Card = ({prod}) => {
  const {modalToggle, currentUser, setProdId, dispatch, categorys} = useInfoContext()

  const handleAdd = () => {
    const find = categorys?.filter(res => res._id === prod?.categoryId)[0]
    if(!currentUser){
      return toast('Пожалуйста, сначала зарегистрируйтесь', 'warning')
    } else if(find.name === 'Напитки' || find.name === 'Соусы' || find.name === 'Закуски'){
      const newProd = {
          ...prod,
          id: uuidv4(),
          quantity: 1,
          totalPrice: prod.price,
      }
      dispatch({ type: 'ADD_ITEM', item: [newProd] });
      toast('Товар добавлен в корзину', 'info') 
    } else if(find.name === "Пицца"){
      modalToggle()
    }
  }

  return (
    <div className='card'>
      {new Date(prod.createdAt).toLocaleDateString() === new Date().toLocaleDateString() && <div className="new">NEW</div>}
      {/* <div className="xit">ХИТ</div> */}
      <div className="card-img">
        <img src={prod?.image?.url} alt="prod_img" />
      </div>
      <div className="card-body">
        <div className="card-content">
          <b>{prod?.name}</b>
          <p>{prod?.content}</p>
        </div>
        <div className="card-footer">
          <Link className="btn" onClick={() => {handleAdd(); setProdId(prod)}}>Выбрать</Link>
          <b>от {prod?.price} ₽</b>
        </div>
      </div>
    </div>
  )
}

export default Card