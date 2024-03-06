import * as yup from "yup";

/**
 * Esquema de validación Yup para el registro de cintas.
 */
export const cintaValidationSchema = yup.object().shape({
  label: yup
    .string()
    .required('Ingrese el label de la cinta'),
  location: yup
    .string()
    .required('Seleccione una ubicación'),
  statusCinta: yup
    .string()
    .required('Seleccione un estado'),
  description: yup
    .string()
    .required('Ingrese la descripción'),
  creationDate: yup
    .string()
    .required('Seleccione la fecha de creación'),
  expireDate: yup
    .string()
    .required('Seleccione la fecha de expiración'),
  rententionDate: yup
    .string()
    .required('Seleccione la fecha de retención')
});