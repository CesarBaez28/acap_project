/**
 * Procesa los datos de las cintas para obtener un formato específico.
 *
 * @param {Object|Array} data - Datos de las cintas a procesar.
 * @returns {Object|Array} - Datos procesados en el formato deseado.
 */
export function processedCintasData(data) {
  /**
   * Procesa un solo conjunto de datos de cinta.
   *
   * @param {Object} singleData - Datos de una sola cinta.
   * @returns {Object} - Datos procesados de la cinta en el formato deseado.
   */
  const processSingleData = (singleData) => ({
    id: singleData.id,
    id_location: singleData.location.id,
    id_statusCinta: singleData.statusCinta.id,
    label: singleData.label,
    location: singleData.location.location,
    description: singleData.description,
    statusCinta: singleData.statusCinta.state,
    creationDate: singleData.creationDate[0],
    creationDateFull: `${singleData.creationDate[0]}-${singleData.creationDate[1]}-${singleData.creationDate[2]}`,
    expiryDate: singleData.expiryDate[0],
    expiryDateFull: `${singleData.expiryDate[0]}-${singleData.expiryDate[1]}-${singleData.expiryDate[2]}`,
    rententionDate: singleData.rententionDate[0],
    rententionDateFull: `${singleData.rententionDate[0]}-${singleData.rententionDate[1]}-${singleData.rententionDate[2]}`
  });

  // Verifica si los datos son un array y aplica la función de procesamiento a cada elemento.
  if (Array.isArray(data)) {
    return data.map(processSingleData);
  } 
  
  // Verifica si los datos son un objeto y aplica la función de procesamiento a ese objeto.
  if (typeof data === 'object') {
    return processSingleData(data);
  } 
  
  // Devuelve un objeto vacío si los datos no son ni un array ni un objeto.
  return {};
}
