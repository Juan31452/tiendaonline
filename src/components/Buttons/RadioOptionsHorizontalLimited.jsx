import React from 'react';
import PropTypes from 'prop-types';
import '../../style/RadioOptionsHorizontal.css';
import { LIMITED_PRODUCT_STATES } from '../../constants/states';

const RadioOptionsHorizontalLimited = ({ value, onChange }) => {
  const limitedStates = LIMITED_PRODUCT_STATES;
  
  const handleOptionChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="radio-options-container">
      {limitedStates.map((option) => (
        <label
          key={option.value}
          htmlFor={`option-limited-${option.value}`}
          className={`radio-option ${value === option.value ? 'selected' : ''}`}
        >
          <input
            id={`option-limited-${option.value}`}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={handleOptionChange}
          />
          <span className="custom-radio" />
          <span className="radio-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

RadioOptionsHorizontalLimited.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioOptionsHorizontalLimited;
