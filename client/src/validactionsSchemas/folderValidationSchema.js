import * as yup from "yup";

export const folderValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Escriba un nombre para la carpeta'),
})