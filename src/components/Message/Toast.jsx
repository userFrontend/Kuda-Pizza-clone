
import React from 'react';
import './Toast.scss';

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast ${type}`}>
      <span>
        {type === 'info' ? <i className="fa-solid fa-info"></i> : 
        type === 'success' ? <i className="fa-regular fa-circle-check"></i> : 
        type === 'error' ? <i className="fa-regular fa-circle-xmark"></i> : 
        type === 'loading' ? <i className="fa-solid fa-spinner"></i> :
        type === 'warning' && <i className="fa-solid fa-triangle-exclamation"></i>}
        {message}
      </span>
      <button onClick={onClose}><i className='fa-solid fa-x'></i></button>
    </div>
  );
};

export default Toast;
