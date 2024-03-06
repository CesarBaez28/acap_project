import { useContext, useState } from 'react'

import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import '../styles/screens/shipmentsScreen.css'

import PlusSvg from '../assets/plus.svg?react'
import SearchSvg from '../assets/search.svg?react'
import { ButtonCreateLink } from "../components/ButtonCreateLink"
import { ButtonSecundary } from '../components/ButtonSecondary'
import { Details } from '../components/Details'
import { ContentSummaryShipments } from '../components/ContentSummaryShipments'

import { useGetShipmentsByUser } from '../hooks/useGetShipmentsByUser'
import { getShipmentsByUserAndBetweenDates } from '../api/getShipmentsByUserAndBetweenDates'
import { formatDateData } from '../utils/formatDateData'
import { UserContext } from '../contexts/userContext'
import { deleteShipment } from '../api/deleteShipment'
import { filterDataById } from '../utils/filterData'
import { AccessibleOption } from '../components/AccesibleOption'
import { ACCESS } from '../constants'
import { ConditionalRender } from '../components/ConditionalRender'

/**
 * Componente que representa la pantalla principal de envíos de cintas.
 * Permite realizar búsquedas y mostrar el historial de envíos de cintas del usuario actual.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla principal de envíos de cintas.
 */
const Content = () => {
  // Contexto del usuario para obtener información del usuario actual y sus permisos.
  const { user, permissions } = useContext(UserContext);
  // Estado para almacenar la fecha inicial de la búsqueda.
  const [initialDateValue, setInitialDateValue] = useState('');
  // Estado para almacenar la fecha final de la búsqueda.
  const [finalDateValue, setFinalDateValue] = useState('');
  // Estado para almacenar la lista de envíos de cintas.
  const [shipments, setShipments, isLoading, setIsLoading] = useGetShipmentsByUser();

  // Función para manejar cambios en la fecha inicial.
  const handleInitialDateValue = (value) => {
    setInitialDateValue(value);
  };

  // Función para manejar cambios en la fecha final.
  const handleFinalDateValue = (value) => {
    setFinalDateValue(value);
  };

  // Función para realizar la búsqueda de envíos de cintas entre las fechas especificadas.
  const handleSearch = async () => {
    if (initialDateValue !== '' && finalDateValue !== '') {
      setIsLoading(true);
      const dataSearch = await getShipmentsByUserAndBetweenDates(user.id, initialDateValue, finalDateValue);
      const formatedSearchData = formatDateData(dataSearch);
      setShipments(formatedSearchData);
      setIsLoading(false);
    }
  };

  // Función para manejar la eliminación de un envío de cintas.
  const handleDelete = async (id) => {
    const response = await deleteShipment(id);
    if (response === 200) {
      filterDataById(shipments, setShipments, id);
    }
  };

  return (
    <>
      <h2 className='shipments-screen-title'>Envíos de cintas</h2>

      {/* Opción accesible para registrar un nuevo movimiento de cintas */}
      <AccessibleOption
        permissions={permissions}
        privilegesId={ACCESS.REGISTER_SHIPMENT}
        Option={
          <ButtonCreateLink href={'/shipments/register'} text={'Registrar Movimiento'} svg={<PlusSvg />} />
        }
      />

      {/* Área de entrada de fechas y botón de búsqueda */}
      <div className='input-area-shipments-screen'>
        {/* Input para la fecha inicial */}
        <input
          onChange={e => handleInitialDateValue(e.target.value)}
          value={initialDateValue}
          className='input-date-search-shipments'
          type="date"
        />
        {/* Input para la fecha final */}
        <input
          onChange={e => handleFinalDateValue(e.target.value)}
          value={finalDateValue}
          className='input-date-search-shipments'
          type="date"
        />
        {/* Botón para realizar la búsqueda */}
        <ButtonSecundary onClick={handleSearch} styles={{ padding: '0.4rem 0.4rem' }} >
          <span className='icon-search-shipments-screen'>
            {<SearchSvg />}
          </span>
        </ButtonSecundary>
      </div>

      {/* Condicionalmente renderiza la lista de envíos de cintas */}
      <ConditionalRender isLoading={isLoading}>
        <section className='shipments-list-section col-md-10'>
          {/* Mapea y renderiza los detalles de cada envío de cintas */}
          {shipments?.map((item) => (
            <Details
              key={item.id}
              date={item.formattedDate}
              title={"Movimiento de cinta"}
              content={<ContentSummaryShipments
                deleteFunction={() => handleDelete(item.id)}
                detailsScreen={'/shipments/details'}
                shipments={item}
              />}
            />
          ))}
        </section>
      </ConditionalRender>
    </>
  );
};

/**
 * Componente principal que representa la pantalla principal de envíos de cintas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla principal de envíos de cintas.
 */
export function ShipmentsScreen() {
  return (
    <>
      {/* Barra lateral */}
      <SideBar />
      {/* Barra de encabezado */}
      <Header />
      {/* Contenido principal que incluye el historial de envíos de cintas */}
      <MainContent content={<Content />} />
    </>
  );
}
