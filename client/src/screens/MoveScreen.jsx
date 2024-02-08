import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'
import { Table } from '../components/TableMoveCintas'
import '../styles/screens/moveScreen.css'
import { ButtonSecundary } from '../components/ButtonSecondary'
import SearchSvg from '../assets/search.svg?react'
import { InputSelect } from '../components/InputSelectWithData'
import { useState } from 'react'
import { Dialog } from '../components/Dialog'
import { ContentDialogMoveCinta } from '../components/ContentDialogMoveCinta'
import { updateCintasLocation } from '../api/updateCintasLocation'
import Check from '../assets/check.svg?react'

import { useGetPartialLocations } from '../hooks/useGetPartialLocations'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { ContentDialogMessage } from '../components/ContentDialogMessage'

import { LOCATIONS_NOT_ALLOWED_TO_MOVE_CINTAS } from '../constants'
import { useBarcodeScanner } from '../hooks/useBarcodeScanner'
import { getCintaByLabel } from '../api/getCintaByLabel'
import { processedCintasData } from '../utils/processedCintasData'

const Content = () => {
  const [cintas, setCintas] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [setLocations] = useState(null)
  
  const handleBarCode = async (barCode) => {
    const cinta = await getCintaByLabel(barCode)
    const processedResult = processedCintasData(cinta)
    const filterData = processedResult.filter(item => !LOCATIONS_NOT_ALLOWED_TO_MOVE_CINTAS.includes(item.location))
    setCintas(prevCintas => [...prevCintas, ...filterData]);
  }

  useBarcodeScanner(handleBarCode)

  const handleSearhCinta = () => {
    setModalShow(true);
  }

  const handleMoveCintas = () => {
    if (selectedOption != null) {
      updateCintasLocation(cintas, selectedOption)
      setCintas([])
      setModalMessage(true)
    }
  }

  return <>
    <h2 className='move-screen-title'>Mover cintas</h2>

    <div className='input-move-screen-container col-md-4 col-lg-3 col-xl-2'>
      <ButtonSecundary onClick={handleSearhCinta} styles={{ padding: '0.3rem 0.7rem', width: '100%', color: '#6F6F6F' }}>
        <div className='button-container-move-screen'>
          <span>Buscar cinta</span>
          <SearchSvg />
        </div>
      </ButtonSecundary>

      <InputSelect
        styles={{ width: '100%' }}
        setData={setLocations}
        value={selectedOption}
        setValue={setSelectedOption}
        atributes={['location']}
        placeholder={'Seleccionar ubicación'}
        getOptionsFunction={useGetPartialLocations}
        filter={LOCATIONS_NOT_ALLOWED_TO_MOVE_CINTAS}
      />
    </div>

    {
      cintas.length !== 0
        ?
        <section className='items-section-move-screen'>
          <Table
            columns={['Label: ', 'Ubicación actual:', 'Descripción', 'Creación:', 'Caduca:', 'Retención:', 'Estado:']}
            atributes={['label', 'location', 'description', 'creationDate', 'expiryDate', 'rententionDate', 'statusCinta']}
            data={cintas}
            setData={setCintas}
          />
          <ButtonPrimary onClick={handleMoveCintas}>Guardar</ButtonPrimary>
        </section>
        : <div></div>
    }

    <Dialog
      ContentDialog={
        <ContentDialogMoveCinta
          data={cintas}
          setData={setCintas}
          setModalShow={setModalShow}
        />
      }
      styles={{ width: '90%', top: '30%', transform: 'translate(-50%, -30%)' }}
      title={'BuscarCinta'}
      open={modalShow}
    />

    <Dialog
      ContentDialog={
        <ContentDialogMessage
          text={'Las cintas se han movido correctamente'}
          svg={<Check />}
          onClick = { () => setModalMessage(false) }
        />
      }
      title={'Mensaje'}
      open={modalMessage}
    />
  </>
}

export function MoveScreen() {
  return <>
    <Header />
    <SideBar />
    <MainContent content={<Content />} />
  </>
}