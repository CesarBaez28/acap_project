export function formatDateData(data) {

  const formattedData = data.map(item => {
    const dateArray = item.date;
    const dateObject = getDataObject(dateArray)

    const formattedDate = formatDate(dateObject)

    const formattedDateTime = formatDateTime(formattedDate, dateObject)

    return {
      ...item,
      formattedDate,
      formattedDateTime,
    }
  })

  return formattedData
}

export function formatDateDataShipmentsReceived(data) {

  const formattedData = data.map(item => {
    const dateArrayShipmentReceived = item.dateReceived
    const dateArrayShipment = item.shipment.date

    const dateObjectShipmentReceived = getDataObject(dateArrayShipmentReceived)
    const formattedDateShipmentReceived = formatDate(dateObjectShipmentReceived)
    const formattedDateTimeShipmentReceived = formatDateTime(formattedDateShipmentReceived, dateObjectShipmentReceived)

    const dateObjectShipment = getDataObject(dateArrayShipment)
    const formattedDateShipment = formatDate(dateObjectShipment)
    const formattedDateTimeShipment = formatDateTime(formattedDateShipment, dateObjectShipment)

    return {
      ...item,
       formattedDateShipmentReceived,
       formattedDateTimeShipmentReceived,
       formattedDateShipment,
       formattedDateTimeShipment
    }
  })

  return formattedData
}

export const getDataObject = (dateArray) => {
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4])
}

export const formatDate = (dateObject) => {
  return `${dateObject.getDate()} de ${dateObject.toLocaleString('default', {
    month: 'long',
  })} de ${dateObject.getFullYear()}`;
}

export const formatDateTime = (formattedDate, dateObject) => {
  return `${formattedDate} ${dateObject.toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;
}