import * as yup from "yup";

export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$/,
    'La contraseña no cumple con los requisitos')
    .required('Ingrese la contraseña actual'),
  newPassword: yup
    .string()
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$/,
    'La contraseña no cumple con los requisitos')
    .required('Ingrese la nueva contraseña'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('Confirme la contraseña')
})