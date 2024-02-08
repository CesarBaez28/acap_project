import { ButtonSecundary } from "./ButtonSecondary"
import SearchSvg from '../assets/search.svg?react'
import '../styles/components/contentDialogMoveCinta.css'
import { useState } from "react"
import { searchCinta } from "../api/searchCinta"
import { Table } from "./TableCintasModal"
import { processedCintasData } from "../utils/processedCintasData"
import { ConditionalRender } from "../components/ConditionalRender"
import { LOCATIONS_NOT_ALLOWED_TO_MOVE_CINTAS as filter } from "../constants"

export function ContentDialogMoveCinta({ data, setData, setModalShow }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchData, setSearchData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleSearchValue = (value) => {
    setSearchValue(value)
  }

  const handleSearch = async () => {
    if (searchValue !== '') {
      setIsLoading(true)
      const result = await searchCinta(searchValue)
      const processedResult = processedCintasData(result)
      const filterData = processedResult.filter(item => !filter.includes(item.location))
      setSearchData(filterData);
      setIsLoading(false)
    }
  }

  return <>
    <div className="input-search-dialog-move-cinta-container">
      <div className="input-search-dialog-move-cinta">
        <input
          onChange={e => handleSearchValue(e.target.value)}
          value={searchValue}
          placeholder='Label, estado, ubicación'
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
      <ConditionalRender isLoading={isLoading}>
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
      </ConditionalRender>
      : null
    }

    <div className="button-container-move-cinta">
      <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
    </div>
  </>
}