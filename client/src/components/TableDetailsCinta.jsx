/* eslint-disable react/prop-types */
import '../styles/components/tableDetailsCinta.css'
import { useState } from 'react';

export function Table({ columns, atributes, data, setData }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="col-12">
      <div className="col-12">
        <table className="col-12">
          <thead>
            <tr>
              {columns.map((name, index) => (
                <th className='th' key={index}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.map((item) => (
              <tr key={item.id}>
                {atributes.map((atribute, index) => (
                  <td className='td' key={index}>{item[atribute]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
