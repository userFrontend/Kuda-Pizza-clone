import React, { useState } from 'react';
import './PhoneInput.scss';

const PhoneInput = () => {
  const [value, setValue] = useState('+998 (__) ___-__-__');

  const handleChange = (e) => {
    let input = e.target.value;
    let numericValue = input.replace(/[^\d]/g, '');
    if (numericValue.startsWith('998')) {
      numericValue = numericValue.slice(3);
    }
    numericValue = numericValue.slice(0, 9);
    let formatted = '+998 (__) ___-__-__';
    let index = 0;
    for (let char of numericValue) {
      formatted = formatted.replace('_', char);
      index++;
    }
    setValue(formatted);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      e.preventDefault();
      let input = e.target.value;
      let numericValue = input.replace(/[^\d]/g, '');

      if (numericValue.startsWith('998')) {
        numericValue = numericValue.slice(3, -1);
      } else {
        numericValue = numericValue.slice(0, -1);
      }

      let formatted = '+998 (__) ___-__-__';
      let index = 0;

      for (let char of numericValue) {
        formatted = formatted.replace('_', char);
        index++;
      }
      setValue(formatted);
    }
  };

  return (
    <input
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value}
      name='phoneNumber'
      placeholder='+998 (__) ___-__-__'
      className="phone-input"
    />
  );
};

export default PhoneInput;
