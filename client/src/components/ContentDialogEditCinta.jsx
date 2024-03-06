/* eslint-disable react/prop-types */

import { Formik, Form } from "formik";
import { TextInput } from "./TextInput";
import { CreatableInputSelect } from "./CreatableInputSelectFormik";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonSecundary } from "./ButtonSecondary";

import '../styles/components/contentDialogEditCinta.css';

import { useGetLocations } from "../hooks/useGetLocations";
import { useGetStatus } from "../hooks/useGetStatus";
import { saveLocation } from "../api/saveLocation";
import { saveStatus } from "../api/saveStatus";
import { saveCinta } from "../api/saveCinta";

import { NOT_STATUS_CINTAS } from "../constants";

import { processedCintasData } from "../utils/processedCintasData";
import { setData as setDataCinta } from '../utils/setData';

import { cintaValidationSchema } from "../validationsSchemas/cintaValidationSchema";

/**
 * Componente que representa el contenido del diálogo para editar cintas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @param {Object} props.selectedItem - Elemento seleccionado para editar.
 * @param {function} props.setData - Función para actualizar los datos de cintas.
 * @param {Array} props.data - Datos actuales de cintas.
 * @param {Array} props.processedData - Datos procesados de cintas.
 * @param {function} props.setProcessedData - Función para actualizar los datos procesados de cintas.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo para editar cintas.
 */
export function ContentDialogEditCinta({ setModalShow, selectedItem, setData, data, processedData, setProcessedData }) {
  // Hooks personalizados para obtener ubicaciones y estados
  const [locations, setlocations] = useGetLocations();
  const [status, setStatus] = useGetStatus(NOT_STATUS_CINTAS);

  // Valores iniciales basados en el elemento seleccionado
  const initialValues = {
    label: selectedItem && selectedItem.label,
    description: selectedItem && selectedItem.description,
    creationDate: selectedItem && new Date(selectedItem.creationDateFull).toISOString().split('T')[0],
    expireDate: selectedItem && new Date(selectedItem.expiryDateFull).toISOString().split('T')[0],
    rententionDate: selectedItem && new Date(selectedItem.rententionDateFull).toISOString().split('T')[0],
    location: selectedItem && selectedItem.id_location,
    statusCinta: selectedItem && selectedItem.id_statusCinta
  };

  // Manejador para editar una cinta
  const editCintaHanlder = async (values, resetForm) => {
    let { label, description, creationDate, expireDate, rententionDate, location, statusCinta } = values;
    // Encuentra la ubicación y estado correspondientes a los ID seleccionados
    location = locations.find(({ id }) => id === location);
    statusCinta = status.find(({ id }) => id === statusCinta);

    // Guarda los datos actualizados de la cinta utilizando la función saveCinta de la API
    const dataCinta = await saveCinta(label, description, creationDate, expireDate, rententionDate, location, statusCinta, selectedItem.id);

    // Procesa los nuevos datos de cintas
    const newData = processedCintasData(dataCinta);

    // Actualiza los datos de cintas y los datos procesados
    setDataCinta(data, dataCinta, setData);
    setDataCinta(processedData, newData, setProcessedData);

    // Reinicia el formulario y oculta el diálogo
    resetForm();
    setModalShow(false);
  };

  // Retorna el formulario Formik que contiene los campos de edición y botones de acción
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={cintaValidationSchema}
      onSubmit={(values, actions) => {
        editCintaHanlder(values, actions.resetForm);
      }}
    >
      <Form>
        {/* Componentes TextInput y CreatableInputSelect para cada campo editable */}
        <TextInput label={'Label: '} name='label' type='text' autoComplete='label' />
        <TextInput label={'Descripción: '} name='description' type='text' autoComplete='description' />
        <CreatableInputSelect data={locations} setData={setlocations} atributes={['location']} createFunction={saveLocation} label={'Ubicación: '} name='location' />
        <CreatableInputSelect data={status} setData={setStatus} atributes={['state']} createFunction={saveStatus} label={'Estado: '} name='statusCinta' />
        <TextInput label={'Fecha de creación: '} name='creationDate' type='date' autoComplete='creationDate' />
        <TextInput label={'Fecha de expiración: '} name='expireDate' type='date' autoComplete='expireDate' />
        <TextInput label={'Fecha de retención: '} name='rententionDate' type='date' autoComplete='rententionDate' />

        {/* Contenedor de botones de acción */}
        <div className="button-container-edit-cinta">
          {/* Botón secundario para cancelar la acción */}
          <ButtonSecundary styles={{ backgroundColor: "#FFF" }} type="button" onClick={() => setModalShow(false)}>
            Cancelar
          </ButtonSecundary>

          {/* Botón primario para guardar los cambios */}
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  );
}
