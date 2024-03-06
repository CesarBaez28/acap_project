import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import { ButtonSecundary } from '../components/ButtonSecondary'
import SearchSvg from '../assets/search.svg?react'
import { InputSelect } from '../components/InputSelect'

import '../styles/screens/shipmentsHistoryScreen.css'
import { useState } from 'react'
import { getShipmentsBetweenDate } from '../api/getShipmentsBetweenDate'
import { getReceivedShipmentsBetweenDate } from '../api/getReceivedShipmentsBetweenDate'
import { Details } from '../components/Details'
import { ContentSummaryShipmentsReceived } from '../components/ContentSummaryShipmentsReceived'
import { ContentSummaryShipments } from '../components/ContentSummaryShipments'
import { ConditionalRender } from '../components/ConditionalRender'

/**
 * Componente que representa la pantalla de historial de envíos.
 * Permite buscar y mostrar un historial de envíos o recibos entre dos fechas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de historial de envíos.
 */
const Content = () => {
  // Estado para almacenar la lista de envíos o recibos
  const [shipments, setShipments] = useState(null);
  // Estado para indicar si la búsqueda está en curso
  const [isLoading, setIsLoading] = useState(false);
  // Estado para almacenar la opción seleccionada (Envíos o Recibidos)
  const [selectedOption, setSelectedOption] = useState({ value: 1, label: 'Envíos' });
  // Estado para indicar la opción actual (1 para Envíos, 2 para Recibidos)
  const [option, setOption] = useState(1);
  // Estado para almacenar la fecha inicial de la búsqueda
  const [initialDateValue, setInitialDateValue] = useState('');
  // Estado para almacenar la fecha final de la búsqueda
  const [finalDateValue, setFinalDateValue] = useState('');

  // Función para manejar cambios en la fecha inicial
  const handleInitialDateValue = (value) => {
    setInitialDateValue(value);
  }

  // Función para manejar cambios en la fecha final
  const handleFinalDateValue = (value) => {
    setFinalDateValue(value);
  }

  // Función para manejar la búsqueda de envíos o recibos
  const handleSearch = async () => {
    if (initialDateValue !== '' && finalDateValue !== '') {
      setIsLoading(true);

      // Buscar envíos entre las fechas especificadas
      if (selectedOption.value === 1) {
        const data = await getShipmentsBetweenDate(initialDateValue, finalDateValue);
        setShipments(data);
        setOption(1);
        setIsLoading(false);
        return;
      }

      // Buscar recibos entre las fechas especificadas
      if (selectedOption.value === 2) {
        const data = await getReceivedShipmentsBetweenDate(initialDateValue, finalDateValue);
        setShipments(data);
        setOption(2);
        setIsLoading(false);
        return;
      }
    }
  }

  return (
    <>
      <h2 className='shipmets-history-title'>Historial de envíos</h2>

      {/* Área de entrada de fechas y opción de búsqueda */}
      <div className='input-area-shipmets-history-screen'>
        {/* Input para la fecha inicial */}
        <input
          onChange={e => handleInitialDateValue(e.target.value)}
          value={initialDateValue}
          className='input-date-search-shipmets-history'
          type="date"
        />
        {/* Input para la fecha final */}
        <input
          onChange={e => handleFinalDateValue(e.target.value)}
          value={finalDateValue}
          className='input-date-search-shipmets-history'
          type="date"
        />
        {/* Select para elegir entre Envíos o Recibidos */}
        <InputSelect
          styles={{ marginTop: '0', borderColor: '#0033A1', height: '100%', width: "130px" }}
          defaultValue={selectedOption}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={[{ value: 1, label: 'Envíos' }, { value: 2, label: 'Recibidos' }]}
        />
        {/* Botón para realizar la búsqueda */}
        <ButtonSecundary onClick={handleSearch} styles={{ padding: '0.4rem 0.4rem' }} >
          <span className='icon-search-shipmets-history-screen'>
            {<SearchSvg />}
          </span>
        </ButtonSecundary>
      </div>

      {/* Condicionalmente renderiza la lista de envíos o recibos */}
      <ConditionalRender isLoading={isLoading}>
        <section className='shipments-history-list-section col-md-10'>
          {/* Mapea y renderiza los detalles de cada envío o recibo */}
          {shipments?.map((item) => (
            option === 1
              ? <Details
                key={item.id}
                date={item.formattedDate}
                title={"Movimiento de cinta"}
                content={<ContentSummaryShipments detailsScreen={'/shipments/details'} shipments={item} />}
              />
              : <Details
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
}

/**
 * Componente principal que representa la pantalla de historial de envíos.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de historial de envíos.
 */
export function ShipmentsHistoryScreen() {
  return (
    <>
      {/* Barra de encabezado */}
      <Header />
      {/* Barra lateral */}
      <SideBar />
      {/* Contenido principal que incluye el historial de envíos */}
      <MainContent content={<Content />} />
    </>
  );
}
