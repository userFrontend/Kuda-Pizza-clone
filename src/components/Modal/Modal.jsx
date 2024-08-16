import React from 'react'
import './Modal.scss'

const Modal = ({toggle, children}) => {
  return (
    <div className='modal'>
        <div className="modal-body">
            <div className="new">NEW</div>
            {children}
            <button className='close' onClick={toggle}><i className='fa-solid fa-x'></i></button>
        </div>
    </div>
  )
}

export default Modal