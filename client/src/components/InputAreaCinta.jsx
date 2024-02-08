import SearchSvg from '../assets/search.svg?react'
import PdfSvg from '../assets/pdf.svg?react'
import ExcelSvg from '../assets/excel.svg?react'
import '../styles/components/inputAreaCinta.css'

import { useContext, useState } from 'react'
import { searchCinta } from '../api/searchCinta'
import { getCintas } from '../api/getCintas'
import { getCintasWithDates } from '../api/getCintasWithDate'
import { searchWithDates } from '../api/searchWithDates'
import { exportPdf } from '../utils/exportPdf'
import { exportExcel } from '../utils/exportExcel'
import { filterCinta } from '../utils/filterCinta'
import { UserContext } from '../contexts/userContext'
import { processedCintasData } from '../utils/processedCintasData'

export function InputAreaCinta({cintas, setCintas, processedCintas, setProcessedCintas, setIsLoading}) {
  const { user } = useContext(UserContext)
  const [searchValue, setSearchValue] = useState('')
  const [initialDateValue, setInitialDateValue] = useState('')
  const [finalDateValue, setFinalDateValue] = useState('')

  const handleSearchValue = (value) => {
    setSearchValue(value)
  }

  const handleInitialDateValue = (value) => {
    setInitialDateValue(value)
  }

  const handleFinalDateValue = (value) => {
    setFinalDateValue(value)
  }

  const exportDataPdf = async () => {
    await exportPdf(cintas)
  }

  const exportDataExcel = async () => {
    await exportExcel(cintas)
  }

  const handleSearch = async () => {
    let data
    setIsLoading(true)
    
    // Search cinta based only on the input text value
    if (searchValue != '' && ( initialDateValue === '' || finalDateValue === '')) 
      data = await searchCinta(searchValue)

    // Get all cintas (This happens when all inputs are empty)
    if (searchValue === '' && ( initialDateValue === '' || finalDateValue === '')) 
      data = await getCintas()

    // Search cinta based only on a range of date
    if (searchValue === '' && initialDateValue != '' && finalDateValue != '') 
      data = await getCintasWithDates(initialDateValue, finalDateValue)
    
    // Search cinta based on the input text and in a rage of date
    if (searchValue != '' && initialDateValue != '' && finalDateValue != '') 
      data = await searchWithDates(searchValue, initialDateValue, finalDateValue)

    const filterData = filterCinta(data, user.location.location)
    const processedData = processedCintasData(filterData)
    setCintas(filterData)
    setProcessedCintas(processedData)
    setIsLoading(false)
  }

  return (
    <div className="input-area-cinta">
      <div className="input-area-cinta-container">
        <div className="input-group-cinta col-12 col-md-6">
          <input 
            onChange={e => handleSearchValue(e.target.value)} 
            value={searchValue} 
            placeholder='Label, estado, ubicación' 
            className="input-search-cinta col-12" 
            type="search" 
          />
          <button onClick={handleSearch} className="button-search">
            <span className="icon-search-cinta">
              <SearchSvg />
            </span>
          </button>
        </div>
        <input 
          onChange={e => handleInitialDateValue(e.target.value)} 
          value={initialDateValue} 
          className="input-date" 
          type="date" 
        />
        <input 
          onChange={e => handleFinalDateValue(e.target.value)} 
          value={finalDateValue} 
          className="input-date" 
          type="date" 
        />
        <div className="input-group-cinta report-group">
          <button onClick={exportDataPdf} className="button-pdf">
            <PdfSvg />
          </button>
          <button onClick={exportDataExcel} className="button-excel">
            <ExcelSvg />
          </button>
        </div>
      </div>
    </div>
  )
}