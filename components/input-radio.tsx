import React from 'react'

const InputRadio = ({
  choices = [],
  current = 0,
  name = '',
  onChange,
  error = false,
  errorMessage = '',
  ...otherProps
}) => {
  return (
    <div className="input-radio" {...otherProps}>
      {choices.map(({ label = '', value = 0 }) => (
        <div className="choices-wrapper">
          <input
            type="radio"
            id={label}
            name={name}
            value={value}
            checked={value === current}
            onChange={onChange}
          />
          <label>{label}</label>
        </div>
      ))}
    </div>
  )
}

export default InputRadio
