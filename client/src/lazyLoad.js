import { lazy } from "react"
 
/**
 * Esta función permite cargar dinámicamente un componente utilizando importación dinámica.
 *
 * @param {string} path - Ruta del módulo o componente a cargar de forma diferida.
 * @param {string|null} nameExport - Nombre del export predeterminado del módulo o componente.
 * @returns {React.LazyExoticComponent<React.Component>} - Componente cargado de forma diferida.
 */
export function lazyLoad(path, nameExport) {
  return lazy(() => {
    // Importa el módulo o componente de la ruta proporcionada.
    const promise = import(path);

    // Retorna la promesa directamente si no se especifica un nombre de exportación.
    if (nameExport === null) { return promise; }

    // Retorna la promesa resuelta con el componente específico según el nombre de exportación.
    return promise.then((module) => ({ default: module[nameExport] }));
  });
}
