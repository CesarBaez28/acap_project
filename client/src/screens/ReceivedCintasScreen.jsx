import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import { ButtonSecundary } from '../components/ButtonSecondary'
import { Details } from '../components/Details'
import { ContentSummaryShipmentsReceived } from '../components/ContentSummaryShipmentsReceived'
import SearchSvg from '../assets/search.svg?react'

import '../styles/screens/receivedCintasScreen.css'
import { useContext, useState } from 'react'
import { useGetReceivedCintasByStatusAndLocation } from '../hooks/useGetReceivedCintasByStatusAndLocation'
import { UserContext } from '../contexts/userContext'
import { RECEIVED_STATUS_ID } from '../constants'
import { getReceivedShipmentByLocationAndDate } from '../api/getReceivedShipmentByLocationAndDate'
import { formatDateDataShipmentsReceived } from '../utils/formatDateData'
import { ConditionalRender } from '../components/ConditionalRender'

/**
 * Contenido específico de la pantalla de cintas recibidas.
 * Permite visualizar información detallada sobre los envíos de cintas recibidas.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de cintas recibidas.
 */
const Content = () => {
  // Contexto de usuario para acceder a la información del usuario actual
  const { user } = useContext(UserContext);
  // Hooks para obtener y gestionar la información de los envíos de cintas recibidas
  const [shipmentsReceived, setShipmentsReceived, isLoading, setIsLoading] = useGetReceivedCintasByStatusAndLocation(RECEIVED_STATUS_ID, user.location.id);
  // Estados para controlar las fechas de búsqueda inicial y final
  const [initialDateValue, setInitialDateValue] = useState('');
  const [finalDateValue, setFinalDateValue] = useState('');

  /**
   * Maneja el cambio en la fecha de búsqueda inicial.
   *
   * @param {string} value - Valor seleccionado en el input de fecha inicial.
   * @returns {void}
   */
  const handleInitialDateValue = (value) => {
    setInitialDateValue(value);
  };

  /**
   * Maneja el cambio en la fecha de búsqueda final.
   *
   * @param {string} value - Valor seleccionado en el input de fecha final.
   * @returns {void}
   */
  const handleFinalDateValue = (value) => {
    setFinalDateValue(value);
  };

  /**
   * Maneja la acción de búsqueda de envíos recibidos según las fechas especificadas.
   *
   * @returns {void}
   */
  const handleSearch = async () => {
    if (initialDateValue !== '' && finalDateValue !== '') {
      setIsLoading(true);
      const data = await getReceivedShipmentByLocationAndDate(user.location.id, initialDateValue, finalDateValue);
      const formatData = formatDateDataShipmentsReceived(data);
      setShipmentsReceived(formatData);
      setIsLoading(false);
    }
  };

  // Renderizado del componente Content
  return (
    <>
      <h2 className='received-cintas-screen-title'>Envíos recibidos</h2>

      {/* Área de entrada para fechas de búsqueda */}
      <div className='input-area-received-cintas-screen'>
        <input
          onChange={(e) => handleInitialDateValue(e.target.value)}
          value={initialDateValue}
          className='input-date-search-received-cintas'
          type="date"
        />
        <input
          onChange={(e) => handleFinalDateValue(e.target.value)}
          value={finalDateValue}
          className='input-date-search-received-cintas'
          type="date"
        />
        {/* Botón para realizar la búsqueda de envíos recibidos */}
        <ButtonSecundary onClick={handleSearch} styles={{ padding: '0.4rem 0.4rem' }} >
          <span className='icon-search-received-cintas-screen'>
            {<SearchSvg />}
          </span>
        </ButtonSecundary>
      </div>

      {/* Renderizado condicional de la lista de envíos recibidos */}
      <ConditionalRender isLoading={isLoading}>
        <section className='received-cintas-list-section col-md-10'>
          {/* Mapeo de envíos recibidos para mostrar detalles de cada uno */}
          {shipmentsReceived?.map((item) => (
            <Details
              key={item.id}
              date={item.formattedDateShipmentReceived}
              title={"Movimiento de cinta"}
              content={<ContentSummaryShipmentsReceived detailsScreen={'/receivedCintas/details'} shipments={item} />}
            />
          ))}
        </section>
      </ConditionalRender>
    </>
  );
};

/**
 * Componente que representa la pantalla de cintas recibidas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de cintas recibidas.
 */
export function ReceivedCintasScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <Header />
      <SideBar />
      <MainContent content={<Content />} />
    </>
  );
}
