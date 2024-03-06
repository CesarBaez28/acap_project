import { useState } from 'react';
import '../styles/components/table.css';

/**
 * Componente `Table` que representa una tabla con datos de cintas
 *
 * @component
 * @example
 * const columns = ['ID', 'Label', 'Estado', 'Ubicación'];
 * const atributes = ['id', 'label', 'status', 'location'];
 * const data = [...]; // Array de objetos con datos
 * const setData = () => {...}; // Función para actualizar datos
 * const selectedItems = [...]; // Array de elementos seleccionados
 * const setSelectedItems = () => {...}; // Función para actualizar elementos seleccionados
 *
 * return (
 *   <Table
 *     columns={columns}
 *     atributes={atributes}
 *     data={data}
 *     setData={setData}
 *     selectedItems={selectedItems}
 *     setSelectedItems={setSelectedItems}
 *   />
 * );
 */
export function Table({ columns, atributes, data, setData, selectedItems, setSelectedItems }) {
  const [selectedNewItem, setSelectedNewItem] = useState([]);

  /**
   * Manejador de cambio para la casilla de verificación de un elemento en la tabla.
   * @param {Object} item - Elemento seleccionado.
   */
  const handleCheck = (item) => {
    const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
    setSelectedItems(
      isSelected
        ? selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...selectedItems, item]
    );
  };

  return (
    <section className="table-area col-12">
      <div className="table-area-container col-12">
        <table className="col-12">
          <thead>
            <tr>
              {columns.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>Seleccionar:</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  {atributes.map((atribute, index) => (
                    <td key={index}>{item[atribute]}</td>
                  ))}
                  <td>
                    <div className="button-actions-table">
                      <input
                        className="checkBox-move-cinta"
                        key={item.id}
                        type="checkbox"
                        onChange={() => handleCheck(item)}
                        checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                      />
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
