// src/components/RadioOptionsHorizontal.jsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { productStates } from '../../constants/states';
import '../../style/RadioOptionsHorizontal.css'; // Importamos estilos

interface RadioOptionsHorizontalProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  activeStatus?: string;
}

const RadioOptionsHorizontal: React.FC<RadioOptionsHorizontalProps> = ({
  onChange,
  defaultValue = '',
  activeStatus,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  useEffect(() => {
    if (activeStatus !== undefined && activeStatus !== selectedOption) {
      setSelectedOption(activeStatus);
    }
  }, [activeStatus, selectedOption]);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="radio-options-container">
      {productStates.map((option) => (
        <label
          key={option.value}
          className={`radio-option ${selectedOption === option.value ? 'selected' : ''}`}
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
          <span className="custom-radio" />
          <span className="radio-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

RadioOptionsHorizontal.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  activeStatus: PropTypes.string,
};

export default RadioOptionsHorizontal;