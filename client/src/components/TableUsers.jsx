/* eslint-disable react/prop-types */
import EditSvg from '../assets/edit.svg?react'
import TrashSvg from '../assets/trash.svg?react'
import '../styles/components/table.css'
import { useContext, useState } from 'react';
import { Dialog } from './Dialog';
import { ContentDialogUser } from './ContentDialogUser';
import { updateStatusUser } from '../api/updateStatusUser';
import { filterDataById } from '../utils/filterData';
import { UserContext } from '../contexts/userContext';
import { AccessibleOption } from './AccesibleOption';
import { ACCESS } from '../constants';

export function Table({ columns, atributes, data, setData }) {
  const { permissions } = useContext(UserContext)
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalShow(true)
  }

  const handleDeleteClick = async (item) => {
    await updateStatusUser(item.id, false)
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
              {permissions.some(({privileges}) => privileges.id === ACCESS.EDIT_USER || privileges.id === ACCESS.DELETE_USER) && (
                <th>Acciones:</th>
              )}
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
                    <AccessibleOption
                      permissions={permissions}
                      privilegesId={ACCESS.EDIT_USER}
                      Option={
                        <button className="button-table" onClick={() => handleEditClick(item)}>
                          <EditSvg />
                        </button>
                      }
                    />
                    <AccessibleOption
                      permissions={permissions}
                      privilegesId={ACCESS.DELETE_USER}
                      Option={
                        <button className="button-table" onClick={() => handleDeleteClick(item)}>
                          <TrashSvg style={{ fill: "red" }} />
                        </button>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <Dialog
      ContentDialog=
      {
        <ContentDialogUser
          data={data}
          setData={setData}
          selectedItem={selectedItem}
          setModalShow={setModalShow}
        />
      }
      title={'Editar usuario'}
      open={modalShow}
    />
  </>
}
