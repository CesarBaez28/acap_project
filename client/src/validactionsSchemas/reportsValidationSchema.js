import * as yup from "yup";

/**
 * Esquema de validación Yup para la entrada de datos de generación de informes
 * de cintas.
 */
export const reportsValidationSchema = yup.object().shape({
  initialDate: yup
    .string()
    .required('Seleccione una fecha'),
  finalDate: yup
    .string()
    .required('Seleccione una fecha'),
  statusCinta: yup
    .string()
    .required('Seleccione un estado')
});