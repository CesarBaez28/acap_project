export function processedCintasData(data) {
  const processSingleData = (singleData) => ({
    id: singleData.id,
    id_location: singleData.location.id,
    id_statusCinta: singleData.statusCinta.id,
    label: singleData.label,
    location: singleData.location.location,
    description: singleData.description,
    statusCinta: singleData.statusCinta.state,
    creationDate: singleData.creationDate[0],
    creationDateFull: singleData.creationDate[0] + '-' + singleData.creationDate[1] + '-' + singleData.creationDate[2],
    expiryDate: singleData.expiryDate[0],
    expiryDateFull: singleData.expiryDate[0] + '-' + singleData.expiryDate[1] + '-' + singleData.expiryDate[2],
    rententionDate: singleData.rententionDate[0],
    rententionDateFull: singleData.rententionDate[0] + '-' + singleData.rententionDate[1] + '-' + singleData.rententionDate[2]
  });

  if (Array.isArray(data)) {
    return data.map(processSingleData);
  } 
  
  if (typeof data === 'object') {
    return processSingleData(data);
  } 
  
  return {};
}
