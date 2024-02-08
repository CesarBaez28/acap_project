export function processedEvidenceData(data) {
  const processSingleData = (singleData) => ({
    id: singleData.evidence.id,
    folders: singleData.folders,
    path: singleData.evidence.path,
    name: singleData.evidence.name,
    size: singleData.evidence.size,
    extension: singleData.evidence.extension,
    evidenceDate: singleData.evidence.evidenceDate[0] + '-' +
                  singleData.evidence.evidenceDate[1] + '-' +
                  singleData.evidence.evidenceDate[2]
                  
  });

  if (Array.isArray(data)) {
    return data.map(processSingleData);
  } 
  
  if (typeof data === 'object') {
    return processSingleData(data);
  } 
  
  return {};
}
