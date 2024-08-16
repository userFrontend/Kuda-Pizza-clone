import React, { useRef, useState } from 'react'
import './DeleteProd.scss'
import { useInfoContext } from '../../context/infoContext'
import { Link } from 'react-router-dom'
import { deleteProd } from '../../api/delRequest'
import { toast } from '../../components/Message/ToastContainer'
import { updateProd } from '../../api/putRequest'

const DeleteProd = () => {
    const {currentUser, setLoadingRes, cards, setCards, categorys} = useInfoContext()
    const [type, setType] = useState('all')
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [getId, setGetId] = useState(null)
    const [images, setImages] = useState({});
    const [category, setCategory] = useState('del')

    const handleDelete = async (id) => {
        setLoading(true)
        try {
            const confirm = window.confirm('Подтвердить удаление продукта')
            if(confirm){
                if(category === 'del'){
                    await deleteProd(id, 'prod')
                } else if(category === 'delete'){
                    await deleteProd(id, 'category')
                }
                const filter = cards.filter(res => res._id !== id)
                setCards(filter)
                toast('Удалить продукт успешно', 'success')
                setLoadingRes(true)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast(error?.response?.data?.message, 'error')
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        try {
            category === 'update' && getId && await updateProd(getId, data, 'prod')
            toast('Update продукт успешно', 'success')
            setLoadingRes(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast(error?.response?.data?.message, 'error')
        }
    }


    const handleImageChange = (e, prodId) => {
        if (e.target.files && e.target.files[0]) {
            const newImage = URL.createObjectURL(e.target.files[0]);
            setImages((prevImages) => ({ ...prevImages, [prodId]: newImage }));
        }
    };

  return (
    <div className='delete-container'>
        <div className="container">
        <div className="title-acc">
                <h2>Продукт</h2>
                <div className="navs">
                    <button className='active-btn'>Удалить товар</button>
                    <Link to='/add'><button>Добавить товар</button></Link>
                </div>
            </div>
            <div className="change-add">
                <button className='btn' onClick={() => setCategory('update')} style={category !== 'update' ? {background: 'white', border: '1px solid #FF7010', color: '#FF7010'} : {}}>Изменить товар</button>
                <button className='btn' onClick={() => setCategory('delete')} style={category !== 'delete' ? {background: 'white', border: '1px solid #FF7010',color: '#FF7010'} : {}}>Удалить категория</button> 
                <button className='btn' onClick={() => setCategory('del')} style={category !== 'del' ? {background: 'white', border: '1px solid #FF7010', color: '#FF7010'} : {}}>Удалить товар</button>
            </div>
            {category === 'update' ? <div className="navbar">
                <ul>
                    <li>
                        <button onClick={() => setType('all')} className={type === 'all' ? "active-prod" : ''}>Все</button>
                    </li>
                    {categorys?.length > 0 && categorys.map(res => {
                        return (
                            <li key={res._id}>
                                <button onClick={() => setType(res._id)} className={res._id === type ? "active-prod" : ''}>{res.name}</button>
                            </li>
                        )
                    })}
                </ul>
            </div> : category === 'del' ? <div className="navbar">
                <ul>
                    <li>
                        <button onClick={() => setType('all')} className={type === 'all' ? "active-prod" : ''}>Все</button>
                    </li>
                    {categorys?.length > 0 && categorys.map(res => {
                        return (
                            <li key={res._id}>
                                <button onClick={() => setType(res._id)} className={res._id === type ? "active-prod" : ''}>{res.name}</button>
                            </li>
                        )
                    })}
                </ul>
            </div> : <div></div>}
            <div className="delete-prod">
                <div className="cards">
                {cards.length > 0 && category === 'del' ? 
                cards.map(prod => {
                    if(prod.categoryId === type || type === 'all'){
                        return (
                            <div key={prod._id} className='delete-card'>
                            {new Date(prod.createdAt).toLocaleDateString() === new Date().toLocaleDateString() && <div className="new">NEW</div>}
                            {/* <div className="xit">ХИТ</div> */}
                            <div className="delete-img">
                              <img src={prod?.image?.url} alt="prod_img" />
                            </div>
                            <div className="delete-body">
                              <div className="delete-content">
                                <b>{prod?.name}</b>
                                <p>{prod?.content}</p>
                              </div>
                              <div className="delete-footer">
                                <b>от {prod?.price} ₽</b>
                                <button disabled={loading} className="btn" onClick={() => {handleDelete(prod._id)}}>Удалить</button>
                              </div>
                            </div>
                          </div>
                        )
                    }
                })
                : category === 'delete' ?  categorys?.map(res => {
                    return (
                        <form onSubmit={handleUpdate} key={res._id} className='delete-card'>
                        {new Date(res.createdAt).toLocaleDateString() === new Date().toLocaleDateString() && <div className="new">NEW</div>}
                        {/* <div className="xit">ХИТ</div> */}
                        <div className="delete-img">
                                <label htmlFor={`image-${res._id}`}>
                                    {update && <i className='fa-solid fa-pen'></i>}
                                    <img src={images[res._id] || res?.image?.url} alt="prod_img" />
                                    <input disabled={!update} onChange={(e) => handleImageChange(e, res._id)} type="file" id={`image-${res._id}`} />
                                </label>
                        </div>
                        <div className="delete-body">
                          <div className="delete-content">
                            <input disabled={!update} type="text" defaultValue={res?.name}/>
                          </div>
                          <div className="delete-footer">
                            <button type={!update ? 'submit' : 'button'} className="btn" onClick={() => {setGetId(res._id); setUpdate(!update)}}>Изменить</button>
                            {!update && <button type='button' disabled={loading} className="btn" onClick={() => {handleDelete(res._id)}}>Удалить</button>}
                          </div>
                        </div>
                      </form>
                    )
                }) : cards.length > 0 && category === 'update' &&
                cards.map(prod => {
                    if (prod.categoryId === type || type === 'all') {
                        return (
                            <form onSubmit={handleUpdate} className='update-card' key={prod._id}>
                                {new Date(prod.createdAt).toLocaleDateString() === new Date().toLocaleDateString() && <div className="new">NEW</div>}
                                <div className="update-img">
                                    <label htmlFor={`image-${prod._id}`}>
                                        <i className='fa-solid fa-pen'></i>
                                        <img src={images[prod._id] || prod?.image?.url} alt="prod_img" />
                                        <input onChange={(e) => handleImageChange(e, prod._id)} type="file" id={`image-${prod._id}`} />
                                    </label>
                                </div>
                                <div className="update-body">
                                    <div className="update-content">
                                        <input type="text" name="name" id="" defaultValue={prod?.name} required /><br />
                                        <textarea type="text" name="content" rows={5} id="" defaultValue={prod?.content} />
                                    </div>
                                    <div className="update-footer">
                                        <label htmlFor="price">
                                            <b>от</b>
                                            <input type="number" name="price" id="" defaultValue={prod?.price} required />
                                            <b>₽</b>
                                        </label>
                                        <button disabled={loading} className="btn" onClick={() => {setGetId(prod._id) }}>Изменить</button>
                                    </div>
                                </div>
                            </form>
                        )
                    }
                    return null;
                })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteProd