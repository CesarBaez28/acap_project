import * as yup from "yup";

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
})