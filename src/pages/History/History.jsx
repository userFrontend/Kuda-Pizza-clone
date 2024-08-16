import React from 'react'
import './History.scss'
import { Link } from 'react-router-dom'
import CardHistory from '../../components/CardHistory/CardHistory'
import { useInfoContext } from '../../context/infoContext'
import { toast } from '../../components/Message/ToastContainer'

const History = () => {
  const {currentUser} = useInfoContext()
  return (
    <div className='container'>
        <div className="history">
            <div className="title-history">
                <h2>Мой аккаунт</h2>
                <div className="navs">
                    <button className='active-btn'>История заказов</button>
                    <Link to='/account'><button>Настройки</button></Link>
                </div>
            </div>
            {currentUser?.orders?.length > 0 ? 
              currentUser.orders.slice().reverse().map(item => {
                return <CardHistory key={item.id} item={item}/>
              })
            : toast('У вас еще нет заказов', )}
        </div>
    </div>
  )
}

export default History