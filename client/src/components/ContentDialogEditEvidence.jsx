import { Formik, Form } from "formik"
import { ButtonPrimary } from "./ButtonPrimary"
import { ButtonSecundary } from "./ButtonSecondary"
import { evidenceValidationSchema } from '../validactionsSchemas/evidenceValidationSchema.js'
import { TextInput } from "./TextInput"

import "../styles/components/contentDialogEvidence.css"
import { updateNameEvidence } from "../api/updateNameEvidence.js"
import { renameEvidenceFile } from "../api/renameEvidenceFile.js"

export function ContentDialogEditEvidence({ setModalShow, selectedItem, setData, data }) {
  const initialValues = { name: selectedItem.name }

  const handleEdit = async (values, resetForm) => {
    const { name } = values
    await renameEvidenceFile(selectedItem.folders.name, selectedItem.name, name)
    await updateNameEvidence(selectedItem, name)
    setData(data.map((item) => (item.id === selectedItem.id ? { ...item, name: name } : item)))
    resetForm()
    setModalShow(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={evidenceValidationSchema}
      onSubmit={(values, actions) => {
        handleEdit(values, actions.resetForm)
      }}
    >
      <Form>
        <TextInput
          label={'Nombre: '}
          name='name'
          type='text'
          autoComplete='name'
        />

        <div className="button-container-edit-evidence">
          <ButtonSecundary
            type="button"
            onClick={() => setModalShow(false)}
          >
            Cancelar
          </ButtonSecundary>
          <ButtonPrimary type="submit">Guardar</ButtonPrimary>
        </div>
      </Form>
    </Formik>
  )
}