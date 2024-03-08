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

/**
 * Contenido específico de la pantalla de detalles de recepción de envíos de cintas.
 * Permite visualizar información detallada sobre la recepción de un envío de cintas y confirmar la recepción.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de detalles de recepción de envíos de cintas.
 */
const Content = () => {
  // Contexto de usuario para acceder a la información del usuario actual
  const { user } = useContext(UserContext);
  // Ubicación actual de la aplicación para obtener el estado del envío de cintas
  const { state } = useLocation();
  // Hooks para obtener y gestionar la información de las cintas asociadas al envío
  const [shipmentsCintas] = useGetShipmentsCintas(state.id);
  // Estado para controlar la visualización del mensaje de confirmación de recepción
  const [modalMessage, setModalMessage] = useState(false);
  // Función de navegación para redirigir a la pantalla de recepción después de la confirmación
  const navigate = useNavigate();

  /**
   * Maneja la acción de confirmar la recepción del envío de cintas.
   * Realiza una llamada a la API para marcar el envío como recibido.
   *
   * @returns {void}
   */
  const handleConfirm = async () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const isoDateString = date.toISOString();
    await saveCintasReceived({
      shipmetData: {
        status: { id: RECEIVED_STATUS_ID },
        shipment: { id: state.id },
        userReceived: { id: user.id },
        dateReceived: isoDateString,
      },
    });
    setModalMessage(true);
  };

  // Renderizado del componente Content
  return (
    <>
      <h2 className='title-shipment-details'>Detalles del envío</h2>

      {/* Contenedor de confirmación de recepción */}
      <div className='confirm-shipment-container'>
        {/* Botón para confirmar la recepción del envío */}
        <ButtonSecundary onClick={handleConfirm} styles={{ display: "flex", gap: '.3rem', alignItems: 'center', padding: ".4rem .6rem" }}>
          <CheckCircleSvg />
          <span>
            Marcar como recibido
          </span>
        </ButtonSecundary>
      </div>

      {/* Sección de detalles del envío */}
      <section className='shipment-details-section col-md-10'>
        {/* Componente Details para mostrar información resumida del envío */}
        <Details
          date={state.formattedDate}
          title={"Movimiento de cinta"}
          content={<ContentSummaryShipmentsDetails shipments={state} />}
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
            />
          </div>
        </Card>

        {/* Diálogo para mostrar el mensaje de confirmación de recepción */}
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
  );
};

/**
 * Componente que representa la pantalla de detalles de recepción de envíos de cintas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de detalles de recepción de envíos de cintas.
 */
export function ReceptionDetailsScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <SideBar />
      <Header />
      <MainContent content={<Content />} />
    </>
  );
}
