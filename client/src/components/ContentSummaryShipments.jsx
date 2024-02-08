import { ButtonSecundaryLink } from "./ButtonSecondaryLink"
import ZooInSvg from '../assets/zoomIn.svg?react'
import TrashSvg from '../assets/trash.svg?react'
import '../styles/components/contentSummaryShipments.css'
import { PENDING_STATUS_ID } from "../constants"
import { ButtonSecundary } from "./ButtonSecondary"

export function ContentSummaryShipments({ shipments, detailsScreen, deleteFunction }) {
  return <>
    <div className="content-summary col-12 col-md-4">

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Fecha registro del movimiento </p>
        <p>{shipments.formattedDateTime}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Enviado desde</p>
        <p>{shipments.locationFrom.location}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Enviado a</p>
        <p>{shipments.locationTo.location}</p>
      </div>
    </div>
    <div className="content-summary col-12 col-md-4">

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Chofer </p>
        <p>{shipments.driver.name}</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Firma</p>
        <p>Ver firma</p>
      </div>

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Registrado por</p>
        <p>{shipments.user.username}</p>
      </div>

    </div>

    <div className="content-summary col-12 col-md-4">

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
      {shipments.status.id === PENDING_STATUS_ID
        ?
        <ButtonSecundary
          onClick = {deleteFunction}
          styles={{display: "flex", alignItems: 'center', padding: ".4rem .6rem", }}
        >
          <TrashSvg style={{fill: "#0033a1"}} />
          <span> Cancelar envío </span>
        </ButtonSecundary>
        : null
      }
    </div>
  </>
}