import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const InputRadio = ({
  choices = [],
  current = '',
  name = '',
  onChange,
  error = false,
  errorMessage = '',
  ...otherProps
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{name}</FormLabel>
      <RadioGroup
        name={name}
        value={current}
        onChange={onChange}
        {...otherProps}
      >
        {choices.map(({ label = '', value = '' }) => (
          <div className="choices-wrapper">
            <FormControlLabel value={value} label={label} control={<Radio />} />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default InputRadio
