import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable';
import { useState, useEffect } from 'react';
import '../styles/components/Input.css';

/**
 * Componente que representa un campo de entrada select con capacidad de creación de nuevas opciones.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setData - Función para establecer los datos asociados a la opción seleccionada.
 * @param {Array} props.optionsData - Datos de las opciones existentes.
 * @param {function} props.setOptionsData - Función para establecer los datos de las opciones existentes.
 * @param {Number} props.value - Valor seleccionado.
 * @param {function} props.setValue - Función para establecer el valor seleccionado.
 * @param {Array} props.atributes - Atributos a mostrar de las opciones existentes.
 * @param {function} props.createFunction - Función para crear una nueva opción.
 * @param {function} props.getDataFunction - Función para obtener datos asociados a una opción.
 * @param {string} props.placeholder - Texto de marcador de posición para el campo de entrada.
 * @param {Object} props.style - Estilos personalizados para el componente.
 * @returns {JSX.Element} - Elemento JSX que representa un campo de entrada select creatable.
 */
export function CreatableInputSelect({
  setData,
  optionsData,
  setOptionsData,
  value,
  setValue,
  atributes,
  createFunction,
  getDataFunction,
  placeholder,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  // Estilos personalizados para el componente CreatableSelect
  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: "0.3rem",
      borderColor: "#CDCDCD",
      borderRadius: "8px",
      ...props.style,
    }),
  };

  /**
   * Función para configurar las propiedades del campo de entrada select
   * al seleccionar una opción.
   * @param {Object} selectedOption - Opción seleccionada.
   */
  const setFieldProps = async (selectedOption) => {
    setValue(selectedOption.value);
    if (selectedOption != null) {
      const option = optionsData.find(({ id }) => id === selectedOption.value);
      if (setData !== undefined) {
        const data = await getDataFunction(option);
        setData(data);
      }
    } else if (setData !== undefined) {
        setData(null);
      }
  };

  /**
   * Función para manejar la creación de una nueva opción.
   * @param {string} inputValue - Valor de la nueva opción.
   */
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

  /**
   * Efecto para actualizar las opciones cuando cambian los datos de opciones.
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

CreatableInputSelect.propTypes = {
  setData: PropTypes.func,
  optionsData: PropTypes.array,
  setOptionsData: PropTypes.func,
  value: PropTypes.number,
  setValue: PropTypes.func,
  atributes: PropTypes.array,
  createFunction: PropTypes.func,
  getDataFunction: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object
}