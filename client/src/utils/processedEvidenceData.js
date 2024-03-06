/**
 * Procesa los datos de evidencias para obtener un formato específico.
 *
 * @param {Object|Array} data - Datos de las evidencias a procesar.
 * @returns {Object|Array} - Datos procesados en el formato deseado.
 */
export function processedEvidenceData(data) {
  /**
   * Procesa un solo conjunto de datos de evidencia.
   *
   * @param {Object} singleData - Datos de una sola evidencia.
   * @returns {Object} - Datos procesados de la evidencia en el formato deseado.
   */
  const processSingleData = (singleData) => ({
    id: singleData.evidence.id,
    folders: singleData.folders,
    path: singleData.evidence.path,
    name: singleData.evidence.name,
    size: singleData.evidence.size,
    extension: singleData.evidence.extension,
    evidenceDate: `${singleData.evidence.evidenceDate[0]}-${singleData.evidence.evidenceDate[1]}-${singleData.evidence.evidenceDate[2]}`
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
