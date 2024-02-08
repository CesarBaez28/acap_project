import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Ingrese un nombre de usuario'),
  employeeNumber: yup
    .string()
    .required('Ingre el número de empleado'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('Ingrese su email'),
  position: yup
    .string()
    .required('Seleccione la posición del usuario'),
  location: yup
    .string()
    .required('Ingrese la sucursal a la que pertence el usuario')
})

export const userValidationSchemaWithoutPositionAndbranchOffice = yup.object().shape(
  Object.keys(userValidationSchema.fields).reduce((acc, key) => {
    if (key !== 'position' && key !== 'location') {
      acc[key] = userValidationSchema.fields[key];
    }
    return acc;
  }, {})
);

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$/,
      'La contraseña no cumple con los requisitos')
    .required('Ingrese la contraseña'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Confirme la contraseña')
})

const passwordSchemaNotRequired = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$/,
      'La contraseña no cumple con los requisitos'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
})

export const createUserValidationSchema = userValidationSchema.concat(passwordSchema)
export const editUserValidationSchema = userValidationSchema.concat(passwordSchemaNotRequired)