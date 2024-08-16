import React, { useEffect, useState } from 'react'
import './Prod.scss'
import Card from '../../components/Card/Card'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import PizzaModal from '../../components/PizzaModal/PizzaModal'
import Title from '../../components/Title/Title'
import { getOneProd } from '../../api/getRequest'
import { useInfoContext } from '../../context/infoContext'

const Prod = () => {
    const {cards, modal} = useInfoContext()
    const id = useParams().id
    const [prodId, setProdId] = useState(null)
    useEffect(()=>{
        const getCategory = async () => {
            try {
                const res = await getOneProd(id, 'category')
                setProdId(res.data.getOne)
            } catch (error) {
                console.log(error);
            }
        }
        if(id){
            getCategory()
        }
    },[id])

    return (<>
      <div className='prod'>
          <div className="container">
            {id &&
                <>
                    <Title text={prodId?.name} />
                    <div className="cards">
                        {prodId?.prods?.length > 0 ?
                        prodId?.prods?.map(item => {
                            return <Card key={item._id} prod={item}/>
                        })
                        : <Loader/>}
                    </div>
                </>}
          </div>
      </div>
      {modal && <PizzaModal/>}
    </>
    )
}

export default Prod