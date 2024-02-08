export function processedUserData(data) {
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
    status: singleData.status           
  });

  if (Array.isArray(data)) {
    return data.map(processSingleData);
  } 
  
  if (typeof data === 'object') {
    return processSingleData(data);
  } 
  
  return {};
}
