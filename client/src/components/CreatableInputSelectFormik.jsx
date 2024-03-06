/* eslint-disable react/prop-types */
import CreatableSelect from 'react-select/creatable';
import { useField } from "formik"
import { useState, useEffect } from 'react';
import '../styles/components/Input.css';

/**
 * Componente que representa un campo de entrada select creatable, integrado con Formik.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {Array} props.data - Datos de las opciones existentes.
 * @param {function} props.setData - Función para establecer los datos de las opciones existentes.
 * @param {Array} props.atributes - Atributos a mostrar de las opciones existentes.
 * @param {function} props.createFunction - Función para crear una nueva opción.
 * @returns {JSX.Element} - Elemento JSX que representa un campo de entrada select creatable.
 */
export function CreatableInputSelect({ label, data, setData, atributes, createFunction, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  // Estilos personalizados para el componente CreatableSelect
  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: "0.3rem",
      borderColor: "#CDCDCD",
      borderRadius: "8px",
    }),
  };

  /**
   * Función para configurar las propiedades del campo de entrada select
   * al seleccionar una opción.
   * @param {Object} selectedOption - Opción seleccionada.
   */
  const setFieldProps = (selectedOption) => {
    setValue(selectedOption.value);
  };

  /**
   * Función para manejar el evento de error.
   */
  const handleError = () => {
    setTouched(true);
  };

  /**
   * Función para manejar la creación de una nueva opción.
   * @param {string} inputValue - Valor de la nueva opción.
   */
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

  /**
   * Efecto secundario para actualizar las opciones cuando cambian los datos de opciones.
   */
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
        onBlur={handleError}
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
