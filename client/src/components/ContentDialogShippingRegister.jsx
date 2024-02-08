import { ButtonSecundary } from "./ButtonSecondary"
import SearchSvg from '../assets/search.svg?react'
import '../styles/components/contentDialogMoveCinta.css'
import { useContext, useState } from "react"
import { searchCinta } from "../api/searchCinta"
import { Table } from "./TableCintasModal"
import { processedCintasData } from "../utils/processedCintasData"
import { NOT_BRANCH_OFFICES } from "../constants"
import { SUPER_USER_BRANCH_OFFICE } from "../constants"
import { UserContext } from "../contexts/userContext"

export function ContentDialogShippingRegister({ data, setData, setModalShow }) {
  const { user } = useContext(UserContext)
  const [searchValue, setSearchValue] = useState('')
  const [searchData, setSearchData] = useState();

  const handleSearchValue = (value) => {
    setSearchValue(value)
  }

  const handleSearch = async () => {
    if (searchValue !== '') {
      const result = await searchCinta(searchValue)
      const processedResult = processedCintasData(result)
      const userLocation = user.location.location
      let filterData
      
      if ( userLocation === SUPER_USER_BRANCH_OFFICE ) {  
        const filterValues = [NOT_BRANCH_OFFICES, userLocation].flat()
        filterData = processedResult.filter(item => filterValues.includes(item.location))
        setSearchData(filterData); return
      }

      filterData = processedResult.filter(item => userLocation.includes(item.location))
      setSearchData(filterData)
    }
  }

  return <>
    <div className="input-search-dialog-move-cinta-container">
      <div className="input-search-dialog-move-cinta">
        <input
          onChange={e => handleSearchValue(e.target.value)}
          value={searchValue}
          placeholder='Label, estado'
          className="input-search-move-cinta"
          type="search"
        />
        <button onClick={handleSearch} className="button-search-move-screen">
          <span className="icon-search-move-cinta">
            <SearchSvg />
          </span>
        </button>
      </div>
    </div>

    {searchData != null
      ?
      <section className="section-table-dialog-move-cinta">
        <Table
          columns={['Label: ', 'Ubicación actual:', 'Descripción', 'Estado:']}
          atributes={['label', 'location', 'description', 'statusCinta']}
          data={searchData}
          setData={setSearchData}
          selectedItems={data}
          setSelectedItems={setData}
        />
      </section>
      : null
    }
    
    <div className="button-container-move-cinta">
      <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
    </div>
  </>
}