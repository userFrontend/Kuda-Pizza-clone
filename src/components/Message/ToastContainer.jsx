// src/components/ToastContainer.js
import React, { useState, useEffect } from 'react';
import Toast from './Toast'
import './Toast.scss'
let toastId = 0;

export const toast = (message, type = 'info') => {
  window.dispatchEvent(
    new CustomEvent('add-toast', { detail: { id: toastId++, message, type } })
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState(null);

  const handleRemoveToast = (id) => {
    setToasts(null);
  };
  useEffect(() => {
    const handleAddToast = (event) => {
      const { id, message, type } = event.detail;
      setToasts({ id, message, type });
      setTimeout(() => handleRemoveToast(id), 4000); // Auto remove after 3 seconds
    };


    window.addEventListener('add-toast', handleAddToast);

    return () => {
      window.removeEventListener('add-toast', handleAddToast);
    };
  }, []);

  return (
    <div className="toast-container">
        {toasts && <Toast
          key={toasts.id}
          message={toasts.message}
          type={toasts.type}
          onClose={() => handleRemoveToast(toasts.id)}
        />}
    </div>
  );
};

export default ToastContainer;
