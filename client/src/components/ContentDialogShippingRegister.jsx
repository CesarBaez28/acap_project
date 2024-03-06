import { ButtonSecondary } from "./ButtonSecondary";
import SearchSvg from '../assets/search.svg?react';
import '../styles/components/contentDialogMoveCinta.css';
import { useContext, useState } from "react";
import { searchCinta } from "../api/searchCinta";
import { Table } from "./TableCintasModal";
import { processedCintasData } from "../utils/processedCintasData";
import { NOT_BRANCH_OFFICES, SUPER_USER_BRANCH_OFFICE } from "../constants";
import { UserContext } from "../contexts/userContext";

/**
 * Componente que representa el contenido del diálogo para buscar cintas 
 * para el registro de envíos 
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.data - Datos actuales de las cintas.
 * @param {function} props.setData - Función para actualizar los datos de las cintas.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo para registrar el envío de cintas.
 */
export function ContentDialogShippingRegister({ data, setData, setModalShow }) {
  // Contexto del usuario para obtener información sobre la ubicación del usuario actual
  const { user } = useContext(UserContext);
  // Estado para almacenar el valor de búsqueda
  const [searchValue, setSearchValue] = useState('');
  // Estado para almacenar los datos de búsqueda
  const [searchData, setSearchData] = useState();

  // Manejador para actualizar el valor de búsqueda
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  // Manejador para realizar la búsqueda de cintas
  const handleSearch = async () => {
    if (searchValue !== '') {
      // Realiza la búsqueda de cintas utilizando la función searchCinta de la API
      const result = await searchCinta(searchValue);
      // Procesa los resultados de la búsqueda
      const processedResult = processedCintasData(result);
      // Obtiene la ubicación del usuario actual
      const userLocation = user.location.location;
      let filterData;

      // Si el usuario es un superusuario, filtra las cintas excluyendo las ubicaciones no permitidas
      if (userLocation === SUPER_USER_BRANCH_OFFICE) {
        const filterValues = [NOT_BRANCH_OFFICES, userLocation].flat();
        filterData = processedResult.filter(item => filterValues.includes(item.location));
        setSearchData(filterData);
        return;
      }

      // Filtra las cintas basándose en la ubicación del usuario actual
      filterData = processedResult.filter(item => userLocation.includes(item.location));
      setSearchData(filterData);
    }
  };

  return (
    <>
      {/* Contenedor de entrada de búsqueda */}
      <div className="input-search-dialog-move-cinta-container">
        <div className="input-search-dialog-move-cinta">
          {/* Entrada de búsqueda */}
          <input
            onChange={e => handleSearchValue(e.target.value)}
            value={searchValue}
            placeholder='Label, estado'
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
        <section className="section-table-dialog-move-cinta">
          {/* Componente Table para mostrar los resultados de la búsqueda */}
          <Table
            columns={['Label: ', 'Ubicación actual:', 'Descripción', 'Estado:']}
            attributes={['label', 'location', 'description', 'statusCinta']}
            data={searchData}
            setData={setSearchData}
            selectedItems={data}
            setSelectedItems={setData}
          />
        </section>
        : null
      }

      {/* Contenedor de botones de acción */}
      <div className="button-container-move-cinta">
        {/* Botón secundario para cancelar la acción */}
        <ButtonSecondary type="button" onClick={() => setModalShow(false)}>Cancelar</ButtonSecondary>
      </div>
    </>
  );
}
