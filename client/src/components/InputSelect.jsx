/* eslint-disable react/prop-types */

import Select from 'react-select';

export function InputSelect({ options, selectedOption, setSelectedOption, defaultValue, styles }) {

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: "0.3rem",
      borderColor: "#CDCDCD",
      borderRadius: "8px",
      ...styles
    })
  }

  return (
    <Select
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={setSelectedOption}
      value={selectedOption}
      options={options}
    />
  )
}