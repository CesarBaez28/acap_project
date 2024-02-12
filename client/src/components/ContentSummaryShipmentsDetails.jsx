import { getSignatureImage } from '../api/getSignatureImage'
import '../styles/components/contentSummaryShipments.css'
import { ButtonSecundary } from './ButtonSecondary'

export function ContentSummaryShipmentsDetails({ shipments }) {

  const viewSignature = async () => {
    await getSignatureImage(shipments.signature.path)
  }

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
        <p>{shipments.user.username}</p>
      </div>

    </div>

    <div className="content-summary col-12 col-md-4">

      <div className='text-summary-container'>
        <p className='title-sumary-content'>Estado</p>
        <p>{shipments.status.state}</p>
      </div>

    </div>
  </>
}