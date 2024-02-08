/* eslint-disable react/prop-types */
import EditSvg from '../assets/edit.svg?react'
import TrashSvg from '../assets/trash.svg?react'
import '../styles/components/table.css'
import ArrowDownload from '../assets/arrowdown.svg?react'
import { useContext, useState } from 'react';
import { downLoadFile } from '../api/downLoadFile';
import { deleteEvidenceFile } from '../api/deleteEvidenceFile';
import { deleteDataEvidence } from '../api/deleteDataEvidence';
import { filterDataById } from '../utils/filterData';
import { Dialog } from './Dialog';
import { ContentDialogEditEvidence } from './ContentDialogEditEvidence';
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
    await deleteEvidenceFile(item.folders.name, item.name)
    await deleteDataEvidence(item)
    filterDataById(data, setData, item.id)
  }

  const handleDownload = async (item) => {
    await downLoadFile(item.folders.name, item.name)
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
                    <AccessibleOption
                      permissions={permissions}
                      privilegesId={ACCESS.EDIT_EVIDENCE}
                      Option={
                        <button className="button-table" onClick={() => handleEditClick(item)}>
                          <EditSvg />
                        </button>
                      }
                    />
                    <AccessibleOption
                      permissions={permissions}
                      privilegesId={ACCESS.DELETE_EVIDENCE}
                      Option={
                        <button className="button-table" onClick={() => handleDeleteClick(item)}>
                          <TrashSvg style={{ fill: "red" }} />
                        </button>
                      }
                    />
                    <button className="button-table" onClick={() => handleDownload(item)}>
                      <ArrowDownload />
                    </button>
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
        <ContentDialogEditEvidence
          selectedItem={selectedItem}
          setModalShow={setModalShow}
          data={data}
          setData={setData}
        />
      }
      title={'Renombrar evidencia'}
      open={modalShow}
    />
  </>
}
