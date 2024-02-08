export function processedShipmentsCintasData (data) {
  const processSingleData = (singleData) => ({
    id: singleData.cintas.id,
    label: singleData.cintas.label,
    description: singleData.cintas.description,        
  });

  if (Array.isArray(data)) {
    return data.map(processSingleData);
  } 
  
  if (typeof data === 'object') {
    return processSingleData(data);
  } 
  
  return {};
}