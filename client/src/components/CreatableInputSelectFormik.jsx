/* eslint-disable react/prop-types */
import CreatableSelect from 'react-select/creatable';
import { useField } from "formik"
import { useState, useEffect } from 'react';
import '../styles/components/Input.css'

const customStyles = {
  control: (defaultStyles) => ({
    ...defaultStyles,
    marginTop: "0.3rem",
    borderColor: "#CDCDCD",
    borderRadius: "8px",
  })
}

export function CreatableInputSelect({ label, data, setData, atributes, createFunction, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const setFieldProps = (selectedOption) => {
    setValue(selectedOption.value);
  };

  const heandleError = () => {
    setTouched(true);
  };

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    const newOption = await createFunction(inputValue);
    setData([...data, { ...newOption }]);
    setOptions((prevOptions) => [
      ...prevOptions,
      { value: newOption.id, label: newOption[atributes[0]] },
    ]);
    setIsLoading(false);
    setValue(newOption.id);
  };

  useEffect(() => {
    if (data) {
      const newOptions = data.map((item) =>
        atributes.map((attribute) => ({
          value: item.id,
          label: item[attribute],
        }))
      );
      setOptions(newOptions.flat());
    }
  }, [data, atributes]);

  return (
    <div className="input-container">
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <CreatableSelect
        onBlur={heandleError}
        styles={customStyles}
        value={options.find((opt) => opt.value === field.value)}
        onChange={(selectedOption) => setFieldProps(selectedOption)}
        options={options}
        isDisabled={isLoading}
        isLoading={isLoading}
        onCreateOption={handleCreate}
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
}