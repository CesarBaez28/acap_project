import { Details } from '../components/Details'
import { ContentSummaryReceivedShipmentsDetails } from '../components/ContentSummaryReceivedShipmentsDetails'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import { Card } from '../components/Card'
import { Table } from '../components/TableDetailsCinta'

import '../styles/screens/shipmentsDetails.css'

import { useGetShipmentsCintas } from '../hooks/useGetShipmentsCintas'

import { useLocation } from 'react-router-dom';

const Content = () => {
  const { state } = useLocation();
  const [shipmentsCintas, setShipmentsCintas] = useGetShipmentsCintas(state.shipment.id)

  return <>
    <h2 className='title-shipment-details'>Detalles del envío</h2>

    <section className='shipment-details-section col-md-10'>
      <Details
        date={state.formattedDateShipmentReceived}
        title={"Movimiento de cinta"}
        content={<ContentSummaryReceivedShipmentsDetails shipments={state} />}
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


    </section>
  </>
}

export function ReceivedCintasDetailsScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}