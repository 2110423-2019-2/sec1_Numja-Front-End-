import React, { useState } from 'react'

import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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
    <div className="input-textbox-wrapper">
      <div className="required-wrapper">{required ? '*' : ''}</div>
      <div className="input-wrapper">
        <OutlinedInput
          error={error}
          spellCheck={false}
          autoComplete="off"
          type={usingPassword && hidePassword ? 'password' : 'text'}
          value={value}
          endAdornment={
            <InputAdornment
              position="end"
              onClick={() => {
                setHidePassword(!hidePassword)
              }}
            >
              {usingPassword ? (
                hidePassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )
              ) : null}
            </InputAdornment>
          }
          {...otherProps}
        />
      </div>
      <FormHelperText error>{errorMessage}</FormHelperText>
      <FormHelperText>{children}</FormHelperText>
      {/* <div className="footnote-wrapper">
        <div className="error-message">{errorMessage}</div>
        <div className="footnote">{children}</div>
      </div> */}
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
