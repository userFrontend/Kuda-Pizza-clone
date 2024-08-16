import React, { useState } from 'react'
import './Account.scss'
import { useInfoContext } from '../../context/infoContext'
import { Link } from 'react-router-dom'
import { updateProd } from '../../api/putRequest'
import { toast } from '../../components/Message/ToastContainer'
import { getOneProd } from '../../api/getRequest'

const Account = () => {
    const {currentUser, setCurrentUser, exit, users} = useInfoContext()
    const [update, setUpdate] = useState(false)
    const [updatePass, setUpdatePass] = useState(false)

    const handeSubmit = async (e) => {
        e.preventDefault()
        try {
            toast('Please wiat...')
            const formData = new FormData(e.target)
            await updateProd(currentUser._id, formData, 'user')
            toast('Обновить пользователя успешно', 'success')
            const res = await getOneProd(currentUser._id, 'user');
            setCurrentUser(res.data.user[0])
            localStorage.setItem("profile", JSON.stringify(res?.data?.user[0]))
            setCurrentUser(res?.data?.user[0]); 
            e.target.reset()
            setUpdate(false)
        } catch (error) {
            console.log(error);
            toast(error?.response?.data?.message, 'error')
            if(error?.response?.data?.message === 'jwt expired'){
                    exit()
                }
        }
    }
    const handeUpdate = async (e) => {
        e.preventDefault()
        try {
            toast('Please wiat...')
            const formData = new FormData(e.target)
            formData.append('role', 'admin')
            await updateProd(formData.get('user'), formData, 'user')
            toast('Обновить пользователя успешно', 'success')
            e.target.reset()
            setUpdate(false)
        } catch (error) {
            console.log(error);
            toast(error?.response?.data?.message, 'error')
            if(error?.response?.data?.message === 'jwt expired'){
                    exit()
                }
        }
    }
  return (
    <div className='container'>
        <div className="user-account">
            <div className="title-acc">
                <h2>Мой аккаунт</h2>
                <div className="navs">
                    <Link to='/history'><button>История заказов</button></Link>
                    <button className='active-btn'>Настройки</button>
                </div>
            </div>
            <div className="user-info">
                <div className="information">
                    <h3>{update ? 'Изменение личных данных' : 'Личные данные'}</h3>
                    <form action="" onSubmit={handeSubmit}>
                        <label htmlFor="name">
                            <span>Имя*</span>
                            <input minLength={3} disabled={!update} id='name' type="text" name='name' defaultValue={currentUser.name} required/>
                        </label>
                        <label htmlFor="tel">
                            <span>Номер телефона*</span>
                            <input minLength={8} disabled={!update} id='tel' type="tel" name='phoneNumber' defaultValue={currentUser.phoneNumber} required/>
                        </label>
                        <label htmlFor="email">
                            <span>Почта</span>
                            <input minLength={10} disabled={!update} id='email' type="email" name='email' defaultValue={currentUser.email} required/>
                        </label>
                        <label htmlFor="date">
                            <span>Дата рождения</span>
                            <input disabled={!update} name='age' id='date' type="date" defaultValue={new Date(currentUser.age).toLocaleDateString().split('.').reverse().join('-')}/>
                        </label>
                        {update && <button type='submit'>Сохранить изменения</button>}
                    </form>
                </div>
                {!update && <button onClick={() => setUpdate(!update)} className='update-btn'><i className="fa-solid fa-pen"></i> <span>Изменить</span></button>}
            </div>
            <div className="user-password">
                <div className="title-pass">
                    <h3>{updatePass ? 'Пароль' : 'Изменить пароль'}</h3>
                    {!updatePass && <button onClick={() => setUpdatePass(!updatePass)} className='update-btn'><i className="fa-solid fa-pen"></i> <span>Изменить</span></button>}
                </div>
                {updatePass && <div className="password">
                    <form action="" onSubmit={handeSubmit}>
                        <label htmlFor="prev">
                            <span>Старый пароль*</span>
                            <input id='prev' type="password" name='prev' required/>
                        </label>
                        <label htmlFor="new">
                            <span>Новый пароль*</span>
                            <input minLength={3} maxLength={12} id='new' type="password" name='password' required/>
                        </label>
                        <label htmlFor="confirm">
                            <span>Подтвердите пароль*</span>
                            <input minLength={3} maxLength={12} id='confirm' type="password" name='confirm' required/>
                        </label>
                        <button type='submit'>Сохранить изменения</button>
                    </form>
                </div>}
            </div>
            <div className="commit">
                <h3>Подписки</h3>
                <label htmlFor="commit">
                    <input type="checkbox" name="commit" id="commit" />
                    Получать предложения и акции
                </label>
            </div>
        </div>
    </div>
  )
}

export default Account