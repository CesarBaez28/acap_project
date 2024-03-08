import { useField } from 'formik';
import PropTypes from 'prop-types'
import '../styles/components/Input.css';

/**
 * Componente `TextInput` para la entrada de texto en formularios usando Formik.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {Number} [props.id] - ID del campo de entrada.
 * @param {string} [props.name] - Nombre del campo de entrada.
 * @param {string} [props.value] - Valor del campo de entrada.
 * @param {string} [props.type] - Tipo del campo de entrada (por defecto es 'text').
 * @returns {JSX.Element} JSX.Element
 */
export function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="input-container">
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="input" value={props.value} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
}