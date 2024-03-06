import { SUPER_USER_BRANCH_OFFICE } from "../constants"

/**
 * Filtra un conjunto de datos de cintas basándose en una ubicación específica.
 *
 * @param {Array} data - Conjunto de datos de cintas a filtrar.
 * @param {string} filter - Ubicación utilizada como criterio de filtrado.
 * @returns {Array} - Conjunto de datos de cintas filtrado según la ubicación especificada.
 */
export function filterCinta(data, filter) {
  let filterData;

  // Verifica si la ubicación de filtrado es diferente a la ubicación de superusuario.
  if (filter !== SUPER_USER_BRANCH_OFFICE) {
    
    // Filtra los datos de cintas para incluir solo aquellos con la ubicación especificada.
    filterData = data.filter((item) => item.location.location === filter);
    return filterData;
  }

  // Si la ubicación de filtrado es la ubicación de superusuario, devuelve todos los datos sin filtrar.
  return data;
}
