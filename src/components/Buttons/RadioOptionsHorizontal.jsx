// src/components/RadioOptionsHorizontal.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { productStates } from '../../constants/states';

const RadioOptionsHorizontal = ({ onChange, defaultValue = '', activeStatus }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  // Sincronizar con el valor activo externo
  useEffect(() => {
    if (activeStatus !== undefined && activeStatus !== selectedOption) {
      setSelectedOption(activeStatus);
    }
  }, [activeStatus]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {productStates.map((option) => (
        <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            style={{ marginRight: '8px', cursor: 'pointer' }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

RadioOptionsHorizontal.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  activeStatus: PropTypes.string
};

export default RadioOptionsHorizontal;