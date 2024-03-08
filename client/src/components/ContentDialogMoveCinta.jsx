import PropTypes from 'prop-types'
import { ButtonSecundary } from "./ButtonSecondary";
import SearchSvg from '../assets/search.svg?react';
import '../styles/components/contentDialogMoveCinta.css';
import { useState } from "react";
import { searchCinta } from "../api/searchCinta";
import { Table } from "./TableCintasModal";
import { processedCintasData } from "../utils/processedCintasData";
import { ConditionalRender } from "../components/ConditionalRender";
import { LOCATIONS_NOT_ALLOWED_TO_MOVE_CINTAS as filter } from "../constants";

/**
 * Componente que representa el contenido del diálogo para mover cintas al centro de datos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.data - Datos actuales de cintas.
 * @param {function} props.setData - Función para actualizar los datos de cintas.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo para mover cintas.
 */
export function ContentDialogMoveCinta({ data, setData, setModalShow }) {
  // Estado para almacenar el valor de búsqueda
  const [searchValue, setSearchValue] = useState('');
  // Estado para almacenar los datos de búsqueda
  const [searchData, setSearchData] = useState();
  // Estado para controlar la carga
  const [isLoading, setIsLoading] = useState(false);

  // Manejador para actualizar el valor de búsqueda
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  // Manejador para realizar la búsqueda
  const handleSearch = async () => {
    if (searchValue !== '') {
      setIsLoading(true);
      // Realiza la búsqueda de cintas utilizando la función searchCinta de la API
      const result = await searchCinta(searchValue);
      // Procesa los resultados de la búsqueda
      const processedResult = processedCintasData(result);
      // Filtra los resultados para excluir ubicaciones no permitidas
      const filterData = processedResult.filter(item => !filter.includes(item.location));
      // Actualiza los datos de búsqueda y finaliza la carga
      setSearchData(filterData);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Contenedor de entrada de búsqueda */}
      <div className="input-search-dialog-move-cinta-container col-12 col-md-6 col-lg-4">
        <div className="input-search-dialog-move-cinta">
          {/* Entrada de búsqueda */}
          <input
            onChange={e => handleSearchValue(e.target.value)}
            value={searchValue}
            placeholder='Label, estado, ubicación'
            className="input-search-move-cinta"
            type="search"
          />
          {/* Botón de búsqueda */}
          <button onClick={handleSearch} className="button-search-move-screen">
            <span className="icon-search-move-cinta">
              <SearchSvg />
            </span>
          </button>
        </div>
      </div>

      {/* Condicionalmente renderiza la tabla de resultados si hay datos de búsqueda */}
      {searchData != null
        ?
        <ConditionalRender isLoading={isLoading}>
          {/* Sección que contiene la tabla de cintas */}
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

      {/* Contenedor de botones de acción */}
      <div className="button-container-move-cinta">
        {/* Botón secundario para cancelar la acción */}
        <ButtonSecundary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecundary>
      </div>
    </>
  );
}

ContentDialogMoveCinta.propTypes = {
  data: PropTypes.array, 
  setData: PropTypes.func,
  setModalShow: PropTypes.func
}