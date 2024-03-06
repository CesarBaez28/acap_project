import { LoadingIndicator } from "./LoadingIndicator";

/**
 * Componente para renderizar condicionalmente el contenido o un indicador de carga.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isLoading - Indica si la carga está en progreso o no.
 * @param {ReactNode} props.children - Contenido que se mostrará si no hay carga en progreso.
 * @returns {JSX.Element | ReactNode} - Elemento JSX que representa el contenido o un indicador de carga.
 */
export function ConditionalRender({ isLoading, children }) {
  // Renderiza un indicador de carga si isLoading es verdadero, de lo contrario, renderiza el contenido proporcionado
  return isLoading ? <LoadingIndicator /> : children;
}
