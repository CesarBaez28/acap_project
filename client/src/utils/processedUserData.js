/**
 * Procesa los datos de usuarios para obtener un formato específico.
 *
 * @param {Object|Array} data - Datos de usuarios a procesar.
 * @returns {Object|Array} - Datos procesados en el formato deseado.
 */
export function processedUserData(data) {
  /**
   * Procesa un solo conjunto de datos de usuario.
   *
   * @param {Object} singleData - Datos de un solo usuario.
   * @returns {Object} - Datos procesados del usuario en el formato deseado.
   */
  const processSingleData = (singleData) => ({
    id: singleData.id,
    locationId: singleData.location.id,
    location: singleData.location.location,
    positionId: singleData.position.id,
    position: singleData.position.position,
    username: singleData.username,
    employeeNumber: singleData.employeeNumber,
    email: singleData.email,
    password: singleData.password,
    creationDate: singleData.creationDate,
    status: singleData.status,
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
