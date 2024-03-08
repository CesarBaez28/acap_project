import { useState, useEffect } from "react";
import Select from 'react-select';
import PropTypes from 'prop-types'

/**
 * Componente `InputSelect` que representa un campo de selección con opciones dinámicas.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.setData - Función para establecer los datos seleccionados.
 * @param {Array} props.atributes - Atributos a mostrar en las opciones del campo de selección.
 * @param {Array} props.filter - Filtro opcional para obtener opciones específicas.
 * @param {Object} props.value - Valor seleccionado en el campo de selección.
 * @param {Function} props.setValue - Función para establecer el valor seleccionado.
 * @param {string} props.placeholder - Texto de marcador de posición del campo de selección.
 * @param {Function} props.getOptionsFunction - Función para obtener las opciones del campo de selección.
 * @param {Function} props.getDataFunction - Función para obtener datos adicionales basados en la opción seleccionada.
 * @param {Object} props.styles - Estilos personalizados para el componente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `InputSelect`.
 */
export function InputSelect({ setData, atributes, filter, value, setValue, placeholder, getOptionsFunction, getDataFunction, styles }) {
  const [options, setOptions] = useState([]);
  const [optionsData] = filter !== undefined ? getOptionsFunction(filter) : getOptionsFunction();

  /**
   * Estilos personalizados para el componente `Select`.
   */
  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      borderColor: "#0033A1",
      borderRadius: "8px",
      width: "205px",
      ...styles
    })
  };

  /**
   * Maneja el cambio de selección y obtiene datos adicionales si está definida la función `getDataFunction`.
   * @param {Object} selectedOption - Opción seleccionada.
   */
  const handleOnChange = async (selectedOption) => {
    setValue(selectedOption);
    if (getDataFunction !== undefined) {
      if (selectedOption !== null) {
        const option = optionsData.find(({ id }) => id === selectedOption.value);
        const evidence = await getDataFunction(option);
        setData(evidence);
      } else {
        setData(null);
      }
    }
  };

  /**
   * Actualiza las opciones del campo de selección cuando cambian los datos o atributos.
   */
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
  );
}

InputSelect.propTypes = {
  setData: PropTypes.func, 
  atributes: PropTypes.array,
  filter: PropTypes.array, 
  value: PropTypes.object,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
  getOptionsFunction: PropTypes.func,
  getDataFunction: PropTypes.func,
  styles: PropTypes.object
}