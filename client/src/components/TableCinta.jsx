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


/**
 * Componente `Table` para mostrar datos de las cintas en forma de tabla
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string[]} props.columns - Nombres de las columnas de la tabla.
 * @param {string[]} props.atributes - Atributos de los datos a mostrar en la tabla.
 * @param {Object[]} props.data - Datos a mostrar en la tabla.
 * @param {Function} props.setData - Función para actualizar los datos.
 * @param {Object[]} props.processedData - Datos procesados a mostrar en la tabla.
 * @param {Function} props.setProcessedData - Función para actualizar los datos procesados.
 * @example
 * return <Table columns={['ID', 'Label', 'Estado']} atributes={['id', 'label', 'status']} data={cintas} setData={setCintas} processedData={processedCintas} setProcessedData={setProcessedCintas} />;
 */
export function Table({ columns, atributes, data, setData, processedData, setProcessedData }) {
  const { permissions } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  /**
   * Manejador de clic para la acción de edición de un elemento en la tabla.
   * @param {Object} item - Elemento seleccionado.
   */
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalShow(true);
  };

  /**
   * Manejador de clic para la acción de eliminación de un elemento en la tabla.
   * @async
   * @param {Object} item - Elemento seleccionado.
   */
  const handleDeleteClick = async (item) => {
    await deleteCinta(item.id);
    filterDataById(data, setData, item.id);
    filterDataById(processedData, setProcessedData, item.id);
  };

  /**
   * Manejador de clic para la acción de generación de código de barras de un elemento en la tabla.
   * @async
   * @param {Object} item - Elemento seleccionado.
   */
  const handleBarcodeClick = async (item) => {
    await generateBarCode(item.label);
  };

  return (
    <>
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
              {processedData &&
                processedData.map((item) => (
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
                              <TrashSvg style={{ fill: 'red' }} />
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
        ContentDialog={
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
  );
}
