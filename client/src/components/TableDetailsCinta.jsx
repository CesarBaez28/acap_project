import { useState } from 'react';
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
export function Table({ columns, atributes, data, setData }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="col-12">
      <div className="col-12">
        <table className="col-12">
          <thead>
            <tr>
              {columns.map((name, index) => (
                <th className='th' key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  {atributes.map((atribute, index) => (
                    <td className='td' key={index}>
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
