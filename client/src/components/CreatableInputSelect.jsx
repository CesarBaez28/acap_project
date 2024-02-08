/* eslint-disable react/prop-types */
import CreatableSelect from 'react-select/creatable';
import { useState, useEffect } from 'react';
import '../styles/components/Input.css'

export function CreatableInputSelect({ setData, optionsData, setOptionsData, value, setValue, atributes, createFunction, getDataFunction, placeholder, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: "0.3rem",
      borderColor: "#CDCDCD",
      borderRadius: "8px",
      ...props.style
    })
  }

  const setFieldProps = async (selectedOption) => {
    setValue(selectedOption.value);
    if (selectedOption != null) {
      const option = optionsData.find(({ id }) => id === selectedOption.value)
      if (setData !== undefined) {
        const data = await getDataFunction(option)
        setData(data)
      }
    } else {
      if (setData !== undefined) {
        setData(null)
      }
    }
  };

  const handleCreate = async (inputValue) => {
    setIsLoading(true);
    const newOption = await createFunction(inputValue);
    setOptionsData([...optionsData, { ...newOption }]);
    setOptions((prevOptions) => [
      ...prevOptions,
      { value: newOption.id, label: newOption[atributes[0]] },
    ]);
    setIsLoading(false);
    setValue(newOption.id);
  };

  useEffect(() => {
    if (optionsData) {
      const newOptions = optionsData.map((item) =>
        atributes.map((attribute) => ({
          value: item.id,
          label: item[attribute],
        }))
      );
      setOptions(newOptions.flat());
    }
  }, [optionsData, atributes]);

  return (
    <div>
      <CreatableSelect
        placeholder={placeholder}
        styles={customStyles}
        value={options.find((opt) => opt.value === value)}
        onChange={(selectedOption) => setFieldProps(selectedOption)}
        options={options}
        isDisabled={isLoading}
        isLoading={isLoading}
        onCreateOption={handleCreate}
      />
    </div>
  );
}