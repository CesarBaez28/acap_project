/**
 * Formatea las fechas en un conjunto de datos y agrega propiedades formateadas a cada elemento.
 *
 * @param {Array} data - Conjunto de datos a formatear.
 * @returns {Array} - Conjunto de datos con propiedades formateadas adicionales.
 */
export function formatDateData(data) {
  const formattedData = data.map(item => {
    const dateArray = item.date;
    const dateObject = getDataObject(dateArray);

    const formattedDate = formatDate(dateObject);
    const formattedDateTime = formatDateTime(formattedDate, dateObject);

    return {
      ...item,
      formattedDate,
      formattedDateTime,
    };
  });

  return formattedData;
}

/**
 * Formatea las fechas en un conjunto de datos de envíos recibidos y agrega propiedades formateadas a cada elemento.
 *
 * @param {Array} data - Conjunto de datos de envíos recibidos a formatear.
 * @returns {Array} - Conjunto de datos con propiedades formateadas adicionales.
 */
export function formatDateDataShipmentsReceived(data) {
  const formattedData = data.map(item => {
    const dateArrayShipmentReceived = item.dateReceived;
    const dateArrayShipment = item.shipment.date;

    const dateObjectShipmentReceived = getDataObject(dateArrayShipmentReceived);
    const formattedDateShipmentReceived = formatDate(dateObjectShipmentReceived);
    const formattedDateTimeShipmentReceived = formatDateTime(formattedDateShipmentReceived, dateObjectShipmentReceived);

    const dateObjectShipment = getDataObject(dateArrayShipment);
    const formattedDateShipment = formatDate(dateObjectShipment);
    const formattedDateTimeShipment = formatDateTime(formattedDateShipment, dateObjectShipment);

    return {
      ...item,
      formattedDateShipmentReceived,
      formattedDateTimeShipmentReceived,
      formattedDateShipment,
      formattedDateTimeShipment,
    };
  });

  return formattedData;
}

/**
 * Convierte un arreglo de fechas en un objeto de fecha.
 *
 * @param {Array} dateArray - Arreglo de fechas [año, mes, día, hora, minutos].
 * @returns {Date} - Objeto de fecha.
 */
export const getDataObject = (dateArray) => {
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
}

/**
 * Formatea una fecha en el formato 'd de MMMM de yyyy'.
 *
 * @param {Date} dateObject - Objeto de fecha a formatear.
 * @returns {string} - Fecha formateada.
 */
export const formatDate = (dateObject) => {
  return `${dateObject.getDate()} de ${dateObject.toLocaleString('default', {
    month: 'long',
  })} de ${dateObject.getFullYear()}`;
}

/**
 * Formatea una fecha y hora en el formato 'd de MMMM de yyyy h:mm a'.
 *
 * @param {string} formattedDate - Fecha formateada.
 * @param {Date} dateObject - Objeto de fecha a formatear.
 * @returns {string} - Fecha y hora formateadas.
 */
export const formatDateTime = (formattedDate, dateObject) => {
  return `${formattedDate} ${dateObject.toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;
}
