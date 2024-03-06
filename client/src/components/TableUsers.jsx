import  { useState, useContext } from 'react';
import EditSvg from '../assets/edit.svg?react';
import TrashSvg from '../assets/trash.svg?react';
import '../styles/components/table.css';
import { Dialog } from './Dialog';
import { ContentDialogUser } from './ContentDialogUser';
import { updateStatusUser } from '../api/updateStatusUser';
import { filterDataById } from '../utils/filterData';
import { UserContext } from '../contexts/userContext';
import { AccessibleOption } from './AccesibleOption';
import { ACCESS } from '../constants';

/**
 * Componente `Table` para mostrar una tabla de usuarios con opciones de edición y eliminación.
 *
 * @component
 * @example
 * const columns = ['ID', 'Nombre', 'Correo Electrónico', 'Estado'];
 * const atributes = ['id', 'name', 'email', 'status'];
 * const data = [...]; // Array de objetos con datos de usuarios
 * const setData = () => {...}; // Función para actualizar datos de usuarios
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
  const { permissions } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  /**
   * Maneja el clic en el botón de edición y muestra el diálogo de edición.
   * @param {Object} item - Objeto de datos del usuario a editar.
   */
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setModalShow(true);
  };

  /**
   * Maneja el clic en el botón de eliminación, actualiza el estado del usuario y filtra los datos por ID.
   * @param {Object} item - Objeto de datos del usuario a eliminar.
   */
  const handleDeleteClick = async (item) => {
    await updateStatusUser(item.id, false);
    filterDataById(data, setData, item.id);
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
                {permissions.some(({ privileges }) => privileges.id === ACCESS.EDIT_USER || privileges.id === ACCESS.DELETE_USER) && (
                  <th>Acciones:</th>
                )}
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
                              <TrashSvg style={{ fill: 'red' }} />
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
        ContentDialog={
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
  );
}
