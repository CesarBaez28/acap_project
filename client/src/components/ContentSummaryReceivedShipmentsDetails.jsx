import { getSignatureImage } from '../api/getSignatureImage'
import '../styles/components/contentSummaryShipments.css'
import { ButtonSecundary } from './ButtonSecondary'

export function ContentSummaryReceivedShipmentsDetails({ shipments }) {

  const viewSignature = async () => {
    await getSignatureImage(shipments.shipment.signature.path)
  }

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
  </>
}