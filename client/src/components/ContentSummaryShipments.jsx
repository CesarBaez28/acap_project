import PropTypes from 'prop-types'
import { ButtonSecundaryLink } from "./ButtonSecondaryLink";
import ZooInSvg from '../assets/zoomIn.svg?react';
import TrashSvg from '../assets/trash.svg?react';
import '../styles/components/contentSummaryShipments.css';
import { PENDING_STATUS_ID } from "../constants";
import { ButtonSecundary } from "./ButtonSecondary";
import { getSignatureImage } from "../api/getSignatureImage";

/**
 * Componente que representa los detalles resumidos de los envíos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.shipments - Información detallada sobre los envíos.
 * @param {string} props.detailsScreen - Ruta a la pantalla de detalles.
 * @param {Function} props.deleteFunction - Función de eliminación del envío.
 * @returns {JSX.Element} - Elemento JSX que representa los detalles resumidos de los envíos.
 */
export function ContentSummaryShipments({ shipments, detailsScreen, deleteFunction }) {

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

      {/* Detalles adicionales y botones */}
      <div className='view-details-summary'>
        <ButtonSecundaryLink
          state={shipments}
          href={detailsScreen}
          styles={{ display: "flex", alignItems: 'center', padding: ".4rem .6rem" }}
        >
          <ZooInSvg />
          <span> Ver detalles </span>
        </ButtonSecundaryLink>
        {shipments.status.id === PENDING_STATUS_ID
          ?
          <ButtonSecundary
            onClick={deleteFunction}
            styles={{ display: "flex", alignItems: 'center', padding: ".4rem .6rem", }}
          >
            <TrashSvg style={{ fill: "#0033a1" }} />
            <span> Cancelar envío </span>
          </ButtonSecundary>
          : null
        }
      </div>
    </>
  );
}

ContentSummaryShipments.propTypes = {
  shipments: PropTypes.object,
  detailsScreen: PropTypes.string,
  deleteFunction: PropTypes.func 
}