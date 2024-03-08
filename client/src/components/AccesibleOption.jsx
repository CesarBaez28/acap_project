import PropTypes from 'prop-types';

/**
 * Componente que renderiza la opción proporcionada solo si el usuario tiene los permisos adecuados.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.permissions - Lista de permisos del usuario, donde cada permiso tiene una propiedad 'privileges'.
 * @param {Number} props.privilegesId - Identificador del privilegio que se debe verificar en los permisos.
 * @param {JSX.Element} props.Option - Elemento JSX que se renderizará si el usuario tiene los permisos adecuados.
 * @returns {JSX.Element | null} - Devuelve la opción proporcionada si el usuario tiene los permisos, de lo contrario, devuelve null.
 */
export function AccessibleOption({ permissions, privilegesId, Option }) {
  
  // Verifica si existen permisos y si al menos uno tiene el privilegio con el identificador proporcionado
  const isAccessible = permissions && permissions.some(({ privileges }) => privileges.id === privilegesId);

  // Retorna la opción proporcionada si el usuario tiene los permisos, de lo contrario, devuelve null
  return isAccessible ? Option : null;
}

AccessibleOption.propTypes = {
  permissions: PropTypes.array,
  privilegesId: PropTypes.number,
  Option: PropTypes.element
}
