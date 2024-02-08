/* eslint-disable react/prop-types */
import Select from 'react-select';
import { useField } from 'formik';
import '../styles/components/Input.css'

export function InputSelect({ label, options, defaultValue, styles, ...props }) {
  const [field, meta, helpers] = useField(props)
  const { setValue, setTouched } = helpers;

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: "0.3rem",
      borderColor: "#CDCDCD",
      borderRadius: "8px",
      ...styles
    })
  }

  const heandleError = () => {
    setTouched(true);
  };

  const handleSelect = (selectedOption) => {
    setValue(selectedOption.value)
  }

  return (
    <div className="input-container">
      <label className="label" htmlFor={props.id || props.name}>{label}</label>
      <Select
        styles={customStyles}
        onBlur={heandleError}
        defaultValue={defaultValue}
        onChange={(selectedOption) => handleSelect(selectedOption)}
        value={options.find((opt) => opt.value === field.value)}
        options={options}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
}
