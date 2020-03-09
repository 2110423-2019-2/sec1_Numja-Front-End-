import React, { useState } from 'react'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
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
  placeholder = 'label',
  ...otherProps
}) => {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <div className="input-textbox-wrapper">
      <FormControl variant="outlined">
        <InputLabel htmlFor={`text-input-${placeholder}`}>
          {placeholder}
        </InputLabel>
        <OutlinedInput
          id={`text-input-${placeholder}`}
          error={error}
          spellCheck={false}
          autoComplete="off"
          type={usingPassword && hidePassword ? 'password' : 'text'}
          value={value}
          label={placeholder}
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
      </FormControl>
      <FormHelperText error>{errorMessage}</FormHelperText>
      <FormHelperText>{children}</FormHelperText>
      <style jsx>{`
        .input-textbox-wrapper {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  )
}

export default InputTextbox
