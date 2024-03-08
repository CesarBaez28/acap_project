import PropTypes from 'prop-types'
import TrashSvg from '../assets/trash.svg?react';
import '../styles/components/table.css';
import { filterDataById } from '../utils/filterData';

/**
 * Componente `Table` que muestra una tabla con datos de cintas para moverse
 * al centro de datos.
 *
 * @component
 * @example
 * const columns = ['ID', 'Nombre', 'Tamaño', 'Fecha de Creación'];
 * const atributes = ['id', 'name', 'size', 'created_at'];
 * const data = [...]; // Array de objetos con datos
 * const setData = () => {...}; // Función para actualizar datos
 *
 * return (
 *   <Table
 *     columns={columns}
 *     atributes={atributes}
 *     data={data}
 *     setData={setData}
 *   />
 * );
 */
export function Table({ columns, atributes, data, setData }) {

  /**
   * Maneja el clic en el botón de eliminación y filtra los datos por ID.
   * @param {Object} item - Objeto de datos a eliminar.
   */
  const handleDeleteClick = async (item) => {
    filterDataById(data, setData, item.id);
  };

  return (
    <section className="table-area col-12">
      <div className="table-area-container col-12">
        <table className="col-12">
          <thead>
            <tr>
              {columns.map((name) => (
                <th key={name}>{name}</th>
              ))}
              <th>Acciones:</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                {atributes.map((atribute) => (
                  <td key={atribute + item.id}>{item[atribute]}</td>
                ))}
                <td>
                  <div className="button-actions-table">
                    <button className="button-table" onClick={() => handleDeleteClick(item)}>
                      <TrashSvg style={{ fill: 'red' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  atributes: PropTypes.array,
  data: PropTypes.array,
  setData: PropTypes.func
}