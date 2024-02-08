import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  employeeNumber: yup
    .string()
    .required('Ingrese su número de empleado'),
  password: yup
    .string()
    .min(8, 'La contraseña es muy corta')
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$/,
    'Su contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial')
    .required('Ingrese la contraseña')
})