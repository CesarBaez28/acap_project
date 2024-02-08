/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../styles/components/table.css'

export function Table({ columns, atributes, data, setData, selectedItems, setSelectedItems }) {
  const [selectedNewItem, setSelectedNewItem] = useState([])

  const handleCheck = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);
    setSelectedItems(isSelected
      ? selectedItems.filter(selectedItem => selectedItem.id !== item.id)
      : [...selectedItems, item]
    )
  }


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
            {data && data.map((item) => (
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
                      checked={selectedItems.some(selectedItem => selectedItem.id === item.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
