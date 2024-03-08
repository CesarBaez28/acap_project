import PropTypes from 'prop-types'
import { getSignatureImage } from '../api/getSignatureImage';
import '../styles/components/contentSummaryShipments.css';
import { ButtonSecundary } from './ButtonSecondary';

/**
 * Componente que representa los detalles resumidos de los envíos recibidos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.shipments - Información detallada sobre los envíos.
 * @returns {JSX.Element} - Elemento JSX que representa los detalles resumidos de los envíos recibidos.
 */
export function ContentSummaryReceivedShipmentsDetails({ shipments }) {

  /**
   * Manejador para ver la firma del envío.
   */
  const viewSignature = async () => {
    await getSignatureImage(shipments.shipment.signature.path);
  };

  return (
    <>
      {/* Columna 1: Detalles del movimiento */}
      <div className="content-summary col-12 col-md-4">
        <div className='text-summary-container'>
          <p className='title-summary-content'>Fecha registro del movimiento </p>
          <p>{shipments.formattedDateTimeShipment}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Enviado desde</p>
          <p>{shipments.shipment.locationFrom.location}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Enviado a</p>
          <p>{shipments.shipment.locationTo.location}</p>
        </div>
      </div>

      {/* Columna 2: Detalles del conductor y firma */}
      <div className="content-summary col-12 col-md-4">
        <div className='text-summary-container'>
          <p className='title-summary-content'>Chofer </p>
          <p>{shipments.shipment.driver.name}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Firma</p>
          <ButtonSecundary
            onClick={viewSignature}
            styles={{
              display: "flex",
              alignItems: 'center',
              padding: "0",
              color: "#0033a1",
              border: "0",
              borderRadius: "0",
              backgroundColor: "#FFF"
            }}
          >
            <span> Ver firma </span>
          </ButtonSecundary>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Registrado por</p>
          <p>{shipments.shipment.user.username}</p>
        </div>
      </div>

      {/* Columna 3: Detalles de recepción */}
      <div className="content-summary col-12 col-md-4">
        <div className='text-summary-container'>
          <p className='title-summary-content'>Recibido por</p>
          <p>{shipments.userReceived.username}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Fecha recibido</p>
          <p>{shipments.formattedDateTimeShipmentReceived}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Estado</p>
          <p>{shipments.status.state}</p>
        </div>
      </div>
    </>
  );
}

ContentSummaryReceivedShipmentsDetails.propTypes = {
  shipments: PropTypes.object
}