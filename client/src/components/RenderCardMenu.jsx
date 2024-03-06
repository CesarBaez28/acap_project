import { CardMenu } from "./CardMenu";

/**
 * Función `RenderCardMenu` para renderizar un menú de tarjetas con opciones filtradas por permisos.
 *
 * @param {string} title - Título del menú de tarjetas.
 * @param {Function} hasPermission - Función que verifica si el usuario tiene un permiso específico.
 * @param {Array} options - Lista de opciones del menú de tarjetas.
 * @returns {JSX.Element|null} - Elemento JSX que representa el menú de tarjetas renderizado o `null` si no hay opciones disponibles.
 */
export function RenderCardMenu(title, hasPermission, options) {
  // Filtrar las opciones disponibles según los permisos del usuario
  const availableOptions = options.filter(option => hasPermission(option.privilege));

  // Verificar si hay opciones disponibles para mostrar
  if (availableOptions.length > 0) {
    return (
      <CardMenu
        title={title}
        options={availableOptions}
      />
    );
  }

  // Si no hay opciones disponibles, retornar null
  return null;
}
