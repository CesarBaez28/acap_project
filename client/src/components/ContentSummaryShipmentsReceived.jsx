import { ButtonSecundaryLink } from "./ButtonSecondaryLink"
import ZooInSvg from '../assets/zoomIn.svg?react'
import '../styles/components/contentSummaryShipments.css'

export function ContentSummaryShipmentsReceived({ shipments, detailsScreen }) {
  return <>
    <div className="content-summary col-12 col-md-4">

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Fecha registro del movimiento </p>
        <p>{shipments.formattedDateTimeShipment}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Enviado desde</p>
        <p>{shipments.shipment.locationFrom.location}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Enviado a</p>
        <p>{shipments.shipment.locationTo.location}</p>
      </div>
    </div>
    <div className="content-summary col-12 col-md-4">

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Chofer </p>
        <p>{shipments.shipment.driver.name}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Firma</p>
        <p>Ver firma</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Registrado por</p>
        <p>{shipments.shipment.user.username}</p>
      </div>

    </div>

    <div className="content-summary col-12 col-md-4">

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Recibido por</p>
        <p>{shipments.userReceived.username}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Fecha recibido</p>
        <p>{shipments.formattedDateTimeShipmentReceived}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Estado</p>
        <p>{shipments.status.state}</p>
      </div>

    </div>

    <div className='view-details-summary'>
      <ButtonSecundaryLink
        state={shipments}
        href={detailsScreen}
        styles={{ display: "flex", alignItems: 'center', padding: ".4rem .6rem" }}
      >
        <ZooInSvg />
        <span> Ver detalles </span>
      </ButtonSecundaryLink>
    </div>
  </>
}