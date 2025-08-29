import React from 'react';
import PropTypes from 'prop-types';
import '../../style/RadioOptionsHorizontal.css';

const RadioOptionsHorizontal = ({ options, name, activeStatus, onChange }) => {
  const handleOptionChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="radio-options-container">
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={`${name}-${option.value}`}
          className={`radio-option ${activeStatus === option.value ? 'selected' : ''}`}
        >
          <input
            id={`${name}-${option.value}`}
            type="radio"
            name={name}
            value={option.value}
            checked={activeStatus === option.value}
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioOptionsHorizontal;

