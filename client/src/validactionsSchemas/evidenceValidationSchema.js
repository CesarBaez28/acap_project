import * as yup from "yup";

export const evidenceValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Escriba un nombre'),
})