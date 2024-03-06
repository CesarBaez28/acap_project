import * as yup from "yup";

/**
 * Esquema de validación Yup para actualizar el nombre de una evidencia.
 */
export const evidenceValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Escriba un nombre'),
})