/**
 * Filtra un conjunto de datos por ID y actualiza la función de estado con los resultados filtrados.
 *
 * @param {Array} data - Conjunto de datos a filtrar.
 * @param {function} setFunction - Función de estado utilizada para actualizar el conjunto de datos filtrados.
 * @param {any} id - ID específico para filtrar el conjunto de datos.
 */
export function filterDataById(data, setFunction, id) {
  // Filtra los datos para excluir el elemento con el ID especificado.
  const filteredData = data.filter((item) => item.id !== id);

  // Actualiza la función de estado con el conjunto de datos filtrado.
  setFunction(filteredData);
}
