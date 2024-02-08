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

const Content = () => {
  const { user } = useContext(UserContext)
  const [shipmentsReceived, setShipmentsReceived, isLoading, setIsLoading] = useGetReceivedCintasByStatusAndLocation(RECEIVED_STATUS_ID, user.location.id)
  const [initialDateValue, setInitialDateValue] = useState('')
  const [finalDateValue, setFinalDateValue] = useState('')

  const handleInitialDateValue = (value) => {
    setInitialDateValue(value)
  }

  const handleFinalDateValue = (value) => {
    setFinalDateValue(value)
  }

  const handleSearch = async () => {
    if (initialDateValue !== '' && finalDateValue !== '') {
      setIsLoading(true)
      const data = await getReceivedShipmentByLocationAndDate(user.location.id, initialDateValue, finalDateValue)
      const formatData = formatDateDataShipmentsReceived(data)
      setShipmentsReceived(formatData)
      setIsLoading(false)
    }
  }

  return <>
    <h2 className='received-cintas-screen-title'>Envíos recibidos</h2>

    <div className='input-area-received-cintas-screen'>
      <input
        onChange={e => handleInitialDateValue(e.target.value)}
        value={initialDateValue}
        className='input-date-search-received-cintas'
        type="date"
      />
      <input
        onChange={e => handleFinalDateValue(e.target.value)}
        value={finalDateValue}
        className='input-date-search-received-cintas'
        type="date"
      />
      <ButtonSecundary onClick={handleSearch} styles={{ padding: '0.4rem 0.4rem' }} >
        <span className='icon-search-received-cintas-screen'>
          {<SearchSvg />}
        </span>
      </ButtonSecundary>
    </div>

    <ConditionalRender isLoading={isLoading}>
      <section className='received-cintas-list-section col-md-10'>
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
}

export function ReceivedCintasScreen() {
  return <>
    <Header />
    <SideBar />
    <MainContent content={<Content />} />
  </>
}