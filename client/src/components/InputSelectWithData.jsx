import { useState } from "react"
import Select from 'react-select';
import { useEffect } from "react";

export function InputSelect({ setData, atributes, filter, value, setValue, placeholder, getOptionsFunction, getDataFunction, styles }) {
  const [options, setOptions] = useState([])
  const [optionsData, setOptionsData] = filter !== undefined ? getOptionsFunction(filter) : getOptionsFunction()

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      borderColor: "#0033A1",
      borderRadius: "8px",
      width: "205px",
      ...styles
    })
  }

  const handleOnChange = async (selectedOption) => {
    setValue(selectedOption)
    if (getDataFunction != undefined) {
      if (selectedOption != null) {
        const option = optionsData.find(({ id }) => id === selectedOption.value)
        const evidence = await getDataFunction(option)
        setData(evidence)
      } else {
        setData(null)
      }
    }
  }

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
    <Select
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      styles={customStyles}
      options={options}
      isClearable={true}
    />
  )
}