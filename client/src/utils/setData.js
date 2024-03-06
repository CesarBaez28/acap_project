/**
 * Actualiza los datos de un conjunto de elementos con nuevos datos y actualiza el estado utilizando la función proporcionada.
 *
 * @param {Array} data - Conjunto de datos original.
 * @param {Object} newData - Nuevos datos a incorporar.
 * @param {Function} setFunction - Función para actualizar el estado con los nuevos datos.
 */
export function setData(data, newData, setFunction) {
  setFunction(
    data.map((item) => (
      item.id === newData.id
        ? { ...newData }
        : item
    ))
  );
}
