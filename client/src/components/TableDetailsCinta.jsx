import PropTypes from 'prop-types'
import '../styles/components/tableDetailsCinta.css';

/**
 * Componente `Table` que representa una tabla simple para mostrar detalles de cintas.
 *
 * @component
 * @example
 * const columns = ['ID', 'Label', 'Estado', 'Ubicación'];
 * const atributes = ['id', 'label', 'status', 'location'];
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
export function Table({ columns, atributes, data }) {

  return (
    <section className="col-12">
      <div className="col-12">
        <table className="col-12">
          <thead>
            <tr>
              {columns.map((name) => (
                <th className='th' key={name}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
                <tr key={item.id}>
                  {atributes.map((atribute) => (
                    <td className='td' key={atribute + item.id}>
                      {item[atribute]}
                    </td>
                  ))}
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
}