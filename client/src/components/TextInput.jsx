/* eslint-disable react/prop-types */
import { useField } from "formik"
import '../styles/components/Input.css'

export function TextInput({ label, ...props }) {
  const [field, meta] = useField(props)

  return (
    <div className='input-container'>
      <label className='label' htmlFor={props.id || props.name}>{label}</label>
      <input className='input' value={props.value} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}
