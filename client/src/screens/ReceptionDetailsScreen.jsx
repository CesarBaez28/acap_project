import { Details } from '../components/Details'
import { ContentSummaryShipmentsDetails } from '../components/ContentSummaryShipmentsDetails'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import { Card } from '../components/Card'
import { Table } from '../components/TableDetailsCinta'
import { Dialog } from '../components/Dialog'
import { ContentDialogMessage } from '../components/ContentDialogMessage'
import CheckCircleSvg from '../assets/checkCircle.svg?react'
import Check from '../assets/check.svg?react'

import '../styles/screens/shipmentsDetails.css'

import { useGetShipmentsCintas } from '../hooks/useGetShipmentsCintas'

import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonSecundary } from '../components/ButtonSecondary'
import { saveCintasReceived } from '../api/saveCintasReceived'
import { RECEIVED_STATUS_ID } from '../constants'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/userContext'

const Content = () => {
  const { user } = useContext(UserContext)
  const { state } = useLocation();
  const [shipmentsCintas, setShipmentsCintas] = useGetShipmentsCintas(state.id)
  const [modalMessage, setModalMessage] = useState(false);
  const navigate = useNavigate()

  const handleConfirm = async () => {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const isoDateString = date.toISOString();
    const data = await saveCintasReceived({
      shipmetData: {
        status: { id: RECEIVED_STATUS_ID },
        shipment: { id: state.id },
        userReceived: { id: user.id },
        dateReceived: isoDateString
      }
    })
    setModalMessage(true)
  }

  return <>
    <h2 className='title-shipment-details'>Detalles del envío</h2>

    <div className='confirm-shipment-container'>
      <ButtonSecundary onClick={handleConfirm} styles={{ display: "flex", gap: '.3rem', alignItems: 'center', padding: ".4rem .6rem" }}>
        <CheckCircleSvg />
        <span>
          Marcar como recibido
        </span>
      </ButtonSecundary>
    </div>

    <section className='shipment-details-section col-md-10'>
      <Details
        date={state.formattedDate}
        title={"Movimiento de cinta"}
        content={<ContentSummaryShipmentsDetails shipments={state} />}
      />

      <Card>
        <h4>Cintas enviadas</h4>

        <div className='table-details-shipments'>
          <Table
            columns={['Label:', "Descripción"]}
            atributes={['label', 'description']}
            data={shipmentsCintas}
            setData={setShipmentsCintas}
          />
        </div>

      </Card>


      <Dialog
        ContentDialog={
          <ContentDialogMessage
            text={'Envío recibido correctamente'}
            svg={<Check />}
            onClick={() => navigate('/reception')}
          />
        }
        title={'Mensaje'}
        open={modalMessage}
      />

    </section>
  </>
}

export function ReceptionDetailsScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}