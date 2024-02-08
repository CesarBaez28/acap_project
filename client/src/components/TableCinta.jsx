/* eslint-disable react/prop-types */
import EditSvg from '../assets/edit.svg?react'
import TrashSvg from '../assets/trash.svg?react'
import BarCodeSvg from '../assets/barcode.svg?react'
import '../styles/components/table.css'
import { generateBarCode } from '../utils/generateBarCode';
import { useContext, useState } from 'react';
import { deleteCinta } from '../api/deleteCinta';
import { filterDataById } from '../utils/filterData';

import { Dialog } from './Dialog';
import { AccessibleOption } from './AccesibleOption';
import { ContentDialogEditCinta } from './ContentDialogEditCinta';
import { UserContext } from '../contexts/userContext';
import { ACCESS } from '../constants';

export function Table({ columns, atributes, data, setData, processedData, setProcessedData }) {
  const { permissions } = useContext(UserContext)
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    console.log(selectedItem)
    setModalShow(true)
  }

  const handleDeleteClick = async (item) => {
    await deleteCinta(item.id)
    filterDataById(data, setData, item.id)
    filterDataById(processedData, setProcessedData, item.id)
  }

  const handleBarcodeClick = async (item) => {
    await generateBarCode(item.label)
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
            {processedData && processedData.map((item) => (
              <tr key={item.id}>
                {atributes.map((atribute, index) => (
                  <td key={index}>{item[atribute]}</td>
                ))}
                <td>
                  <div className="button-actions-table">
                    <AccessibleOption
                      permissions={permissions}
                      privilegesId={ACCESS.EDIT_CINTA}
                      Option={
                        <button className="button-table" onClick={() => handleEditClick(item)}>
                          <EditSvg />
                        </button>
                      }
                    />
                    <AccessibleOption
                      permissions={permissions}
                      privilegesId={ACCESS.DELETE_CINTA}
                      Option={
                        <button className="button-table" onClick={() => handleDeleteClick(item)}>
                          <TrashSvg style={{ fill: "red" }} />
                        </button>
                      }
                    />
                    <button className="button-table" onClick={() => handleBarcodeClick(item)}>
                      <BarCodeSvg />
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
        <ContentDialogEditCinta
          setModalShow={setModalShow}
          selectedItem={selectedItem}
          setData={setData}
          data={data}
          processedData={processedData}
          setProcessedData={setProcessedData}
        />
      }
      title={'Editar cinta'}
      open={modalShow}
    />
  </>
}
