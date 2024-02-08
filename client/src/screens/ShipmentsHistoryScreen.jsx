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

const Content = () => {
  const [shipments, setShipments] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState({ value: 1, label: 'Envíos' })
  const [option, setOption] = useState(1) // 1 = Envíos. 2 = Recibidos
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

      // find shipments between date
      if (selectedOption.value === 1) {
        const data = await getShipmentsBetweenDate(initialDateValue, finalDateValue);
        setShipments(data); setOption(1); setIsLoading(false); return
      }

      // find received shipments between date
      if (selectedOption.value === 2) {
        const data = await getReceivedShipmentsBetweenDate(initialDateValue, finalDateValue);
        setShipments(data); setOption(2); setIsLoading(false); return
      }
    }
  }

  return <>
    <h2 className='shipmets-history-title'>Historial de envíos</h2>

    <div className='input-area-shipmets-history-screen'>
      <input
        onChange={e => handleInitialDateValue(e.target.value)}
        value={initialDateValue}
        className='input-date-search-shipmets-history'
        type="date"
      />
      <input
        onChange={e => handleFinalDateValue(e.target.value)}
        value={finalDateValue}
        className='input-date-search-shipmets-history'
        type="date"
      />
      <InputSelect
        styles={{ marginTop: '0', borderColor: '#0033A1', height: '100%', width: "130px" }}
        defaultValue={selectedOption}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={[{ value: 1, label: 'Envíos' }, { value: 2, label: 'Recibidos' }]}
      />
      <ButtonSecundary onClick={handleSearch} styles={{ padding: '0.4rem 0.4rem' }} >
        <span className='icon-search-shipmets-history-screen'>
          {<SearchSvg />}
        </span>
      </ButtonSecundary>
    </div>

    <ConditionalRender isLoading={isLoading}>
      <section className='shipments-history-list-section col-md-10'>
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
}

export function ShipmentsHistoryScreen() {
  return <>
    <Header />
    <SideBar />
    <MainContent content={<Content />} />
  </>
}