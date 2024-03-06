import * as yup from "yup";

/**
 * Esquema de validación Yup para el registro de una carpeta de evidencias
 */
export const folderValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Escriba un nombre para la carpeta'),
})