import { SideBar } from "../components/SideBar.jsx"
import { Header } from "../components/Header.jsx"
import { MainContent } from "../components/MainContent.jsx"
import { reportsValidationSchema } from '../validactionsSchemas/reportsValidationSchema.js'
import { Formik, Form } from "formik"
import '../styles/screens/reports.css'
import { useGetStatus } from "../hooks/useGetStatus.js"
import { TextInput } from "../components/TextInput.jsx"
import { CreatableInputSelect } from "../components/CreatableInputSelectFormik.jsx"
import { saveStatus } from "../api/saveStatus.js"
import { ButtonPrimary } from "../components/ButtonPrimary.jsx"
import PdfSvg from '../assets/pdf.svg?react'
import ExcelSvg from '../assets/excel.svg?react'
import { useState } from "react"
import { searchWithDates } from "../api/searchWithDates.js"
import { exportExcel } from "../utils/exportExcel.js"
import { exportPdf } from "../utils/exportPdf.js"

import { NOT_STATUS_CINTAS } from "../constants.js"

const initialValues = {
  initialDate: '',
  finalDate: '',
  statusCinta: ''
};

const stylesButton = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.3rem'
}

const Content = () => {
  const [status, setStatus] = useGetStatus(NOT_STATUS_CINTAS)
  const [option, setOption] = useState()

  const reportHandler = async (values, resetForm) => {
    let { initialDate, finalDate, statusCinta } = values
    statusCinta = status.find(({ id }) => id === statusCinta)
    const [data] = await searchWithDates(statusCinta.state, initialDate, finalDate)
    if (option === 'excel') { await exportExcel(data) }
    if (option === 'pdf') { await exportPdf(data)}
    resetForm()
  }

  return <>
    <h2 className="report-title">Generar reportes</h2>
    <section className="reports-input-section col-md-4 col-lg-3">
      <Formik
        initialValues={initialValues}
        validationSchema={reportsValidationSchema}
        onSubmit={(values, actions) => {
          reportHandler(values, actions.resetForm)
        }}
      >
        <Form>
          <TextInput
            label={'Fecha inicial: '}
            name='initialDate'
            type='date'
            autoComplete='initialDate'
          />
          <TextInput
            label={'Fecha final: '}
            name='finalDate'
            type='date'
            autoComplete='finalDate'
          />
          <CreatableInputSelect
            data={status}
            setData={setStatus}
            atributes={['state']}
            createFunction={saveStatus}
            label={'Estado: '}
            name='statusCinta'
          />

          <div className="reports-button-container">
            <ButtonPrimary 
              onClick = {() => setOption('pdf')}
              type='submit'
              styles={stylesButton} 
              additionalStyles={{backgroundColor: '#F21D2F', border: '1px solid #F21D2F', padding: '0.4rem 0.6rem'}}
            >
              <PdfSvg />
              Exportar en pdf
            </ButtonPrimary>
            <ButtonPrimary 
              onClick = {() => setOption('excel')}
              type='submit'
              styles={stylesButton}
              additionalStyles={{backgroundColor: '#0DA200', border: '1px solid #0DA200', padding: '0.4rem 0.6rem'}}
              >
              <ExcelSvg />
              Exportar en excel
            </ButtonPrimary>
          </div>
        </Form>
      </Formik>
    </section>
  </>
}

export function ReportsScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}