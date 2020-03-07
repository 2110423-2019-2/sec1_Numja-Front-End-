import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const InputDate = ({ name = '', value, onChange, ...otherProps }) => (
  <div className="input-textbox-wrapper">
    <InputLabel
      htmlFor={`text-input-${name}`}
      style={{ marginBottom: '0.25rem' }}
    >
      {name}
    </InputLabel>
    <OutlinedInput
      id={`text-input-${name}`}
      type="date"
      value={value}
      name={name}
      onChange={onChange}
      {...otherProps}
    />
    <style jsx>{`
      .input-textbox-wrapper {
        margin-bottom: 1rem;
      }
    `}</style>
  </div>
)

export default InputDate
