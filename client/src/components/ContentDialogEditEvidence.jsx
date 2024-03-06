import { Formik, Form } from "formik";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonSecundary } from "./ButtonSecondary";
import { evidenceValidationSchema } from '../validactionsSchemas/evidenceValidationSchema.js';
import { TextInput } from "./TextInput";

import "../styles/components/contentDialogEvidence.css";
import { updateNameEvidence } from "../api/updateNameEvidence.js";
import { renameEvidenceFile } from "../api/renameEvidenceFile.js";

/**
 * Componente que representa el contenido del diálogo para editar evidencia de cintas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setModalShow - Función para controlar la visibilidad del diálogo.
 * @param {Object} props.selectedItem - Elemento seleccionado para editar.
 * @param {function} props.setData - Función para actualizar los datos de evidencia.
 * @param {Array} props.data - Datos actuales de evidencia.
 * @returns {JSX.Element} - Elemento JSX que representa el contenido del diálogo para editar evidencia.
 */
export function ContentDialogEditEvidence({ setModalShow, selectedItem, setData, data }) {
  // Valores iniciales basados en el elemento seleccionado
  const initialValues = { name: selectedItem.name };

  // Manejador para la edición de evidencia
  const handleEdit = async (values, resetForm) => {
    const { name } = values;

    // Renombra el archivo de evidencia en el servidor mediante la función renameEvidenceFile de la API
    await renameEvidenceFile(selectedItem.folders.name, selectedItem.name, name);

    // Actualiza el nombre de la evidencia en la base de datos mediante la función updateNameEvidence de la API
    await updateNameEvidence(selectedItem, name);

    // Actualiza los datos locales de evidencia con el nuevo nombre
    setData(data.map((item) => (item.id === selectedItem.id ? { ...item, name: name } : item)));

    // Reinicia el formulario y oculta el diálogo
    resetForm();
    setModalShow(false);
  };

  // Retorna el formulario Formik que contiene el campo de edición y botones de acción
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={evidenceValidationSchema}
      onSubmit={(values, actions) => {
        handleEdit(values, actions.resetForm);
      }}
    >
      <Form>
        {/* Componente TextInput para el campo de edición de nombre */}
        <TextInput label={'Nombre: '} name='name' type='text' autoComplete='name' />

        {/* Contenedor de botones de acción */}
        <div className="button-container-edit-evidence">
          {/* Botón secundario para cancelar la acción */}
          <ButtonSecundary type="button" onClick={() => setModalShow(false)}>
            Cancelar
          </ButtonSecundary>

          {/* Botón primario para guardar los cambios */}
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  );
}
