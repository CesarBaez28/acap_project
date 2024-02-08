export function processedEvidenceData(data) {
  const processSingleData = (singleData) => ({
    /// .... 
  });

  if (Array.isArray(data)) {
    return data.map(processSingleData);
  } 
  
  if (typeof data === 'object') {
    return processSingleData(data);
  } 
  
  return {};
}
