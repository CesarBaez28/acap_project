/* eslint-disable react/prop-types */
import Select from 'react-select';
import { useField } from 'formik';
import '../styles/components/Input.css';

/**
 * Componente `InputSelect` que representa un campo de selección integrado con Formik.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo de selección.
 * @param {Array} props.options - Opciones disponibles para el campo de selección.
 * @param {Object} props.defaultValue - Valor predeterminado del campo de selección.
 * @param {Object} props.styles - Estilos personalizados para el componente.
 * @param {Object} props... - Otras propiedades de React-Select y Formik que se pueden pasar directamente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `InputSelect`.
 */
export function InputSelect({ label, options, defaultValue, styles, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

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

  /**
   * Maneja el evento onBlur para marcar el campo como tocado.
   */
  const handleBlur = () => {
    setTouched(true);
  };

  /**
   * Maneja el cambio de selección y actualiza el valor del campo.
   * @param {Object} selectedOption - Opción seleccionada.
   */
  const handleSelect = (selectedOption) => {
    setValue(selectedOption.value);
  };

  return (
    <div className="input-container">
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <Select
        styles={customStyles}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        onChange={(selectedOption) => handleSelect(selectedOption)}
        value={options.find((opt) => opt.value === field.value)}
        options={options}
        {...props} // Pasar otras propiedades de React-Select y Formik
      />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
}
