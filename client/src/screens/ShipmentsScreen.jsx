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

const Content = () => {
  const { user, permissions } = useContext(UserContext)
  const [initialDateValue, setInitialDateValue] = useState('')
  const [finalDateValue, setFinalDateValue] = useState('')
  const [shipments, setShipments, isLoading, setIsLoading] = useGetShipmentsByUser();

  const handleInitialDateValue = (value) => {
    setInitialDateValue(value)
  }

  const handleFinalDateValue = (value) => {
    setFinalDateValue(value)
  }

  const handleSearch = async () => {
    if (initialDateValue !== '' && finalDateValue !== '') {
      setIsLoading(true)
      const dataSearch = await getShipmentsByUserAndBetweenDates(user.id, initialDateValue, finalDateValue)
      const formatedSearchData = formatDateData(dataSearch)
      setShipments(formatedSearchData)
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const response = await deleteShipment(id)
    if (response === 200) {
      filterDataById(shipments, setShipments, id);
    }
  }

  return <>
    <h2 className='shipments-screen-title'>Envíos de cintas</h2>

    <AccessibleOption
      permissions={permissions}
      privilegesId={ACCESS.REGISTER_SHIPMENT}
      Option={
        <ButtonCreateLink href={'/shipments/register'} text={'Registrar Movimiento'} svg={<PlusSvg />} />
      }
    />

    <div className='input-area-shipments-screen'>
      <input
        onChange={e => handleInitialDateValue(e.target.value)}
        value={initialDateValue}
        className='input-date-search-shipments'
        type="date"
      />
      <input
        onChange={e => handleFinalDateValue(e.target.value)}
        value={finalDateValue}
        className='input-date-search-shipments'
        type="date"
      />
      <ButtonSecundary onClick={handleSearch} styles={{ padding: '0.4rem 0.4rem' }} >
        <span className='icon-search-shipments-screen'>
          {<SearchSvg />}
        </span>
      </ButtonSecundary>
    </div>

    <ConditionalRender isLoading={isLoading}>
      <section className='shipments-list-section col-md-10'>

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
}

export function ShipmentsScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}