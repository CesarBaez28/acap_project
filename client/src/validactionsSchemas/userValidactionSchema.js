import * as yup from "yup";

/**
 * Esquema de validación Yup para la entrada de datos de creación o edición de un usuario.
 */
export const userValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Ingrese un nombre de usuario'),
  employeeNumber: yup
    .string()
    .required('Ingrese el número de empleado'),
  email: yup
    .string()
    .email('El email no es válido')
    .required('Ingrese su email'),
  position: yup
    .string()
    .required('Seleccione la posición del usuario'),
  location: yup
    .string()
    .required('Ingrese la sucursal a la que pertenece el usuario')
});

/**
 * Esquema de validación Yup para la entrada de datos de creación o edición de un usuario sin incluir posición y sucursal.
 */
export const userValidationSchemaWithoutPositionAndBranchOffice = yup.object().shape(
  Object.keys(userValidationSchema.fields).reduce((acc, key) => {
    if (key !== 'position' && key !== 'location') {
      acc[key] = userValidationSchema.fields[key];
    }
    return acc;
  }, {})
);

/**
 * Esquema de validación Yup para la entrada de datos de contraseña y confirmación de contraseña.
 */
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
});

/**
 * Esquema de validación Yup para la entrada de datos de contraseña y confirmación de contraseña, sin requerir la contraseña.
 */
const passwordSchemaNotRequired = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$/,
      'La contraseña no cumple con los requisitos'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
});

/**
 * Esquema de validación Yup para la entrada de datos de creación de un usuario, incluyendo la validación de contraseña.
 */
export const createUserValidationSchema = userValidationSchema.concat(passwordSchema);

/**
 * Esquema de validación Yup para la entrada de datos de edición de un usuario, incluyendo la validación de contraseña (opcional).
 */
export const editUserValidationSchema = userValidationSchema.concat(passwordSchemaNotRequired);