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

/**
 * Contenido específico de la pantalla de detalles de cintas recibidas.
 * Permite visualizar información detallada sobre un envío de cintas recibidas.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de detalles de cintas recibidas.
 */
const Content = () => {
  // Obtención del estado de la ubicación actual, incluyendo la información del envío de cintas
  const { state } = useLocation();
  // Hook para obtener y gestionar la información de las cintas asociadas al envío
  const [shipmentsCintas, setShipmentsCintas] = useGetShipmentsCintas(state.shipment.id);

  // Renderizado del componente Content
  return (
    <>
      <h2 className='title-shipment-details'>Detalles del envío</h2>

      {/* Sección de detalles del envío */}
      <section className='shipment-details-section col-md-10'>
        {/* Componente Details para mostrar información resumida del envío */}
        <Details
          date={state.formattedDateShipmentReceived}
          title={"Movimiento de cinta"}
          content={<ContentSummaryReceivedShipmentsDetails shipments={state} />}
        />

        {/* Tarjeta para mostrar las cintas enviadas en el envío */}
        <Card>
          <h4>Cintas enviadas</h4>

          {/* Tabla de detalles de cintas enviadas */}
          <div className='table-details-shipments'>
            <Table
              columns={['Label:', 'Descripción']}
              atributes={['label', 'description']}
              data={shipmentsCintas}
              setData={setShipmentsCintas}
            />
          </div>
        </Card>
      </section>
    </>
  );
};

/**
 * Componente que representa la pantalla de detalles de cintas recibidas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de detalles de cintas recibidas.
 */
export function ReceivedCintasDetailsScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <SideBar />
      <Header />
      <MainContent content={<Content />} />
    </>
  );
}
