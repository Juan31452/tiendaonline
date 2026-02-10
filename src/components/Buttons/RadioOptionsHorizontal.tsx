// RadioOptionsHorizontal.tsx
import React from 'react';
import '../../style/RadioOptionsHorizontal.css';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioOptionsHorizontalProps {
  options: RadioOption[];
  name: string;
  activeStatus: string; // ← IMPORTANTE: usar activeStatus, NO value
  onChange: (value: string) => void;
}

const RadioOptionsHorizontal: React.FC<RadioOptionsHorizontalProps> = ({
  options,
  name,
  activeStatus, // ← Recibe como activeStatus
  onChange,
}) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
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

export default RadioOptionsHorizontal;