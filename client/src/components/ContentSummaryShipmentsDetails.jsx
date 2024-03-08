import PropTypes from 'prop-types'
import { getSignatureImage } from '../api/getSignatureImage';
import '../styles/components/contentSummaryShipments.css';
import { ButtonSecundary } from './ButtonSecondary';

/**
 * Componente que muestra los detalles resumidos de los envíos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.shipments - Información detallada sobre los envíos.
 * @returns {JSX.Element} - Elemento JSX que muestra los detalles resumidos de los envíos.
 */
export function ContentSummaryShipmentsDetails({ shipments }) {

  /**
   * Manejador para ver la firma del envío.
   */
  const viewSignature = async () => {
    await getSignatureImage(shipments.signature.path);
  };

  return (
    <>
      {/* Columna 1: Detalles del movimiento */}
      <div className="content-summary col-12 col-md-4">
        <div className='text-summary-container'>
          <p className='title-summary-content'>Fecha registro del movimiento </p>
          <p>{shipments.formattedDateTime}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Enviado desde</p>
          <p>{shipments.locationFrom.location}</p>
        </div>

        <div className='text-summary-container'>
          <p className='title-summary-content'>Enviado a</p>
          <p>{shipments.locationTo.location}</p>
        </div>
      </div>

      {/* Columna 2: Detalles del conductor y firma */}
      <div className="content-summary col-12 col-md-4">
        <div className='text-summary-container'>
          <p className='title-summary-content'>Chofer </p>
          <p>{shipments.driver.name}</p>
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
          <p>{shipments.user.username}</p>
        </div>
      </div>

      {/* Columna 3: Detalles del estado */}
      <div className="content-summary col-12 col-md-4">
        <div className='text-summary-container'>
          <p className='title-summary-content'>Estado</p>
          <p>{shipments.status.state}</p>
        </div>
      </div>
    </>
  );
}

ContentSummaryShipmentsDetails.propTypes = {
  shipments: PropTypes.object
}