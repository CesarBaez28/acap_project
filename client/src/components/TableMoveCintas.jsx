/* eslint-disable react/prop-types */
import TrashSvg from '../assets/trash.svg?react'
import '../styles/components/table.css'
import { useState } from 'react';
import { filterDataById } from '../utils/filterData'

export function Table({ columns, atributes, data, setData }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteClick = async (item) => {    
    filterDataById(data, setData, item.id)
  }

  return <>
    <section className="table-area col-12">
      <div className="table-area-container col-12">
        <table className="col-12">
          <thead>
            <tr>
              {columns.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>Acciones:</th>
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
                    <button className="button-table" onClick={() => handleDeleteClick(item)}>
                      <TrashSvg style={{fill: "red"}} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </>
}
