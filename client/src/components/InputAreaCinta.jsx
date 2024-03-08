import PropTypes from 'prop-types'
import SearchSvg from '../assets/search.svg?react';
import PdfSvg from '../assets/pdf.svg?react';
import ExcelSvg from '../assets/excel.svg?react';
import '../styles/components/inputAreaCinta.css';

import { useContext, useState } from 'react';
import { searchCinta } from '../api/searchCinta';
import { getCintas } from '../api/getCintas';
import { getCintasWithDates } from '../api/getCintasWithDate';
import { searchWithDates } from '../api/searchWithDates';
import { exportPdf } from '../utils/exportPdf';
import { exportExcel } from '../utils/exportExcel';
import { filterCinta } from '../utils/filterCinta';
import { UserContext } from '../contexts/userContext';
import { processedCintasData } from '../utils/processedCintasData';

/**
 * Componente `InputAreaCinta` que representa el área de entrada para filtrar y exportar datos de cintas.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.cintas - Lista de cintas.
 * @param {Function} props.setCintas - Función para establecer la lista de cintas.
 * @param {Array} props.processedCintas - Lista de cintas procesadas.
 * @param {Function} props.setProcessedCintas - Función para establecer la lista de cintas procesadas.
 * @param {Function} props.setIsLoading - Función para establecer el estado de carga.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `InputAreaCinta`.
 */
export function InputAreaCinta({ cintas, setCintas, setProcessedCintas, setIsLoading }) {
  const { user } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState('');
  const [initialDateValue, setInitialDateValue] = useState('');
  const [finalDateValue, setFinalDateValue] = useState('');

  /**
   * Manejador para el cambio del valor de búsqueda.
   * @param {string} value - Nuevo valor de búsqueda.
   */
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  /**
   * Manejador para el cambio del valor de la fecha inicial.
   * @param {string} value - Nuevo valor de la fecha inicial.
   */
  const handleInitialDateValue = (value) => {
    setInitialDateValue(value);
  };

  /**
   * Manejador para el cambio del valor de la fecha final.
   * @param {string} value - Nuevo valor de la fecha final.
   */
  const handleFinalDateValue = (value) => {
    setFinalDateValue(value);
  };

  /**
   * Función para exportar datos en formato PDF.
   */
  const exportDataPdf = async () => {
    await exportPdf(cintas);
  };

  /**
   * Función para exportar datos en formato Excel.
   */
  const exportDataExcel = async () => {
    await exportExcel(cintas);
  };

  /**
   * Manejador para realizar la búsqueda y filtrado de cintas.
   */
  const handleSearch = async () => {
    let data;
    setIsLoading(true);

    // Búsqueda de cintas basada solo en el valor de texto de entrada
    if (searchValue !== '' && (initialDateValue === '' || finalDateValue === ''))
      data = await searchCinta(searchValue);

    // Obtener todas las cintas (esto ocurre cuando todos los campos de entrada están vacíos)
    if (searchValue === '' && (initialDateValue === '' || finalDateValue === ''))
      data = await getCintas();

    // Búsqueda de cintas basada solo en un rango de fechas
    if (searchValue === '' && initialDateValue !== '' && finalDateValue !== '')
      data = await getCintasWithDates(initialDateValue, finalDateValue);

    // Búsqueda de cintas basada en el texto de entrada y en un rango de fechas
    if (searchValue !== '' && initialDateValue !== '' && finalDateValue !== '')
      data = await searchWithDates(searchValue, initialDateValue, finalDateValue);

    const filterData = filterCinta(data, user.location.location);
    const processedData = processedCintasData(filterData);
    setCintas(filterData);
    setProcessedCintas(processedData);
    setIsLoading(false);
  };

  return (
    <div className="input-area-cinta">
      <div className="input-area-cinta-container">
        <div className="input-group-cinta col-12 col-md-6">
          <input
            onChange={(e) => handleSearchValue(e.target.value)}
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
          onChange={(e) => handleInitialDateValue(e.target.value)}
          value={initialDateValue}
          className="input-date"
          type="date"
        />
        <input
          onChange={(e) => handleFinalDateValue(e.target.value)}
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
  );
}

InputAreaCinta.propTypes = {
  cintas: PropTypes.array,
  setCintas: PropTypes.func,
  setProcessedCintas: PropTypes.func,
  setIsLoading: PropTypes.func
}