import React, { useState } from 'react'
import { Eye, EyeSlashed } from '../assets/svg'

const InputTextbox = ({
  usingPassword = false,
  value = '',
  error = false,
  errorMessage = '',
  children = <></>,
  required = false,
  ...otherProps
}) => {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <div className={`input-textbox-wrapper ${error ? 'error' : ''}`}>
      <div className="required-wrapper">{required ? '*' : ''}</div>
      <div className="input-wrapper">
        <input
          spellCheck={false}
          autoComplete={'off'}
          type={usingPassword && hidePassword ? 'password' : 'text'}
          value={value}
          {...otherProps}
        />
        <div
          className="eye-wrapper"
          onClick={() => {
            setHidePassword(!hidePassword)
          }}
        >
          {usingPassword ? hidePassword ? <Eye /> : <EyeSlashed /> : null}
        </div>
      </div>
      <div className="footnote-wrapper">
        <div className="error-message">{errorMessage}</div>
        <div className="footnote">{children}</div>
      </div>
      <style jsx>
        {`
          .input-wrapper {
            display: flex;
          }
          .error input {
            border-color: red;
          }
        `}
      </style>
    </div>
  )
}

export default InputTextbox
