import { Details } from '../components/Details'
import { ContentSummaryShipmentsDetails } from '../components/ContentSummaryShipmentsDetails'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import { Card } from '../components/Card'
import { Table } from '../components/TableDetailsCinta'

import '../styles/screens/shipmentsDetails.css'

import { useGetShipmentsCintas } from '../hooks/useGetShipmentsCintas'

import { useLocation } from 'react-router-dom';

/**
 * Componente que representa la pantalla de detalles de envío.
 * Muestra información detallada sobre un envío, incluyendo la fecha, el movimiento de cintas y una tabla con las cintas enviadas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de detalles de envío.
 */
const Content = () => {
  // Obtener el estado de la ubicación desde el componente de enrutamiento
  const { state } = useLocation();
  // Estado para almacenar la información de las cintas del envío
  const [shipmentsCintas, setShipmentsCintas] = useGetShipmentsCintas(state.id);

  return (
    <>
      <h2 className='title-shipment-details'>Detalles del envío</h2>

      {/* Sección de detalles del envío */}
      <section className='shipment-details-section col-md-10'>
        {/* Componente de detalles que muestra la fecha y el resumen del movimiento de cintas */}
        <Details
          date={state.formattedDate}
          title={"Movimiento de cinta"}
          content={<ContentSummaryShipmentsDetails shipments={state} />}
        />

        {/* Componente de tarjeta que contiene la tabla de cintas enviadas */}
        <Card>
          <h4>Cintas enviadas</h4>
          {/* Contenedor de la tabla de detalles de cintas */}
          <div className='table-details-shipments'>
            {/* Componente de tabla para mostrar las cintas enviadas */}
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
 * Componente que representa la pantalla de detalles de envío.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de detalles de envío.
 */
export function ShipmentsDetailsScreen() {
  return (
    <>
      {/* Barra lateral */}
      <SideBar />
      {/* Encabezado */}
      <Header />
      {/* Contenido principal que incluye los detalles del envío */}
      <MainContent content={<Content />} />
    </>
  );
}
