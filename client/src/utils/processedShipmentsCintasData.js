/**
 * Procesa los datos de cintas en envíos para obtener un formato específico.
 *
 * @param {Object|Array} data - Datos de cintas en envíos a procesar.
 * @returns {Object|Array} - Datos procesados en el formato deseado.
 */
export function processedShipmentsCintasData(data) {
  /**
   * Procesa un solo conjunto de datos de cintas en envíos.
   *
   * @param {Object} singleData - Datos de una sola cinta en envío.
   * @returns {Object} - Datos procesados de la cinta en envío en el formato deseado.
   */
  const processSingleData = (singleData) => ({
    id: singleData.cintas.id,
    label: singleData.cintas.label,
    description: singleData.cintas.description,
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
