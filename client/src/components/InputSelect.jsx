import PropTypes from 'prop-types'

import Select from 'react-select';

/**
 * Componente `InputSelect` que representa un campo de selección.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.options - Opciones disponibles para la selección.
 * @param {Object} props.selectedOption - Opción seleccionada.
 * @param {Function} props.setSelectedOption - Función para establecer la opción seleccionada.
 * @param {Object} props.defaultValue - Valor predeterminado para el campo de selección.
 * @param {Object} props.styles - Estilos personalizados para el componente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `InputSelect`.
 */
export function InputSelect({ options, selectedOption, setSelectedOption, defaultValue, styles }) {

  /**
   * Estilos personalizados para el componente `Select`.
   */
  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: "0.3rem",
      borderColor: "#CDCDCD",
      borderRadius: "8px",
      ...styles
    })
  };

  return (
    <Select
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={setSelectedOption}
      value={selectedOption}
      options={options}
    />
  );
}

InputSelect.propTypes = {
  options: PropTypes.array,
  selectedOption: PropTypes.object,
  setSelectedOption: PropTypes.func,
  defaultValue: PropTypes.object,
  styles: PropTypes.object 
}