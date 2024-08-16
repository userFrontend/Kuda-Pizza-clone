import React, { useRef, useState } from 'react'
import './AddProd.scss'
import { useInfoContext } from '../../context/infoContext'
import { addProd } from '../../api/addRequest'
import { Link } from 'react-router-dom'
import { toast } from '../../components/Message/ToastContainer'

const AddProd = () => {
    const {currentUser, setLoadingRes, categorys} = useInfoContext()
    const [selectItem, setSelectItem] = useState('pizza')
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState(false)
    const [images, setImages] = useState(null)

    const handleAdd = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        setLoading(true)
        try {
            data.append('authorId', currentUser._id)
            const res = category ? await addProd(data, 'category') : await addProd(data, 'prod')
            toast('Продукт добавлен успешно', 'success')
            setImages(null)
            // e.target.reset()
            setLoadingRes(true)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast(error?.response?.data?.message, 'error')
        }
    }

    const handleChange = (e) => {
        setSelectItem(e.target.value)
    }

    const handleImageChange = (e) => {
        if(e.target){
            const newImages = URL.createObjectURL(e.target.files[0]);
            setImages(newImages);
          }
      };


  return (
    <div className='add-container'>
        <div className="container">
        <div className="title-acc">
                <h2>Продукт</h2>
                <div className="navs">
                    <Link to='/delete'><button>Удалить товар</button></Link>
                    <button className='active-btn'>Добавить товар</button>
                </div>
            </div>
            <div className="change-add">
                <button className='btn' onClick={() => setCategory(true)} style={!category ? {background: 'white', border: '1px solid #FF7010',color: '#FF7010'} : {}}>Добавить категория</button> 
                <button className='btn' onClick={() => setCategory(false)} style={category ? {background: 'white', border: '1px solid #FF7010', color: '#FF7010'} : {}}>Добавить товар</button>
            </div>
            <div className="add-prod">
                <img className='add-img' src={images ? images : "./images/disabled.jpg"} />
                <form action="" onSubmit={handleAdd}>
                    {!category && <label htmlFor="">
                        <span>Тип</span>
                        <select onChange={handleChange} name='categoryId' required>
                            {categorys.length > 0 ? 
                                categorys.filter(res => res.name !== 'Акции').map(res => {
                                    return <option key={res._id} value={res._id}>{res.name}</option>
                                })
                            : 
                                <option disabled selected>Категория не добавлена</option>
                            }
                        </select>
                    </label>}
                    <label htmlFor="">
                        <span>Изображение</span>
                        <input onChange={handleImageChange} type="file" name='image' placeholder='Image' required/>
                    </label>
                    <label htmlFor="">
                        <span>Имя</span>
                        <input type="text" name='name' placeholder='Name' required/>
                    </label>
                    {selectItem !== '66a4e677b7023d8a75514390' && !category && <label htmlFor="">
                        <span>Содержание</span>
                        <textarea type="text" name='content' rows={5} placeholder='Content' required></textarea>
                    </label>}
                   {!category && <label htmlFor="">
                        <span>Цена</span>
                        <input type="number" name='price' placeholder='Price' required/>
                    </label>}
                    <button disabled={loading} className='btn'>Добавить {category ? 'категория' : 'товар'}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddProd