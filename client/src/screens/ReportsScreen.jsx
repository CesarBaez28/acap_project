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

/**
 * Contenido específico de la pantalla de generación de reportes.
 * Permite al usuario filtrar datos por fechas y estado de cintas, generando informes en formato PDF o Excel.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de generación de reportes.
 */
const Content = () => {
  // Hooks para obtener y gestionar los estados de las cintas
  const [status, setStatus] = useGetStatus(NOT_STATUS_CINTAS);
  // Estado local para almacenar la opción seleccionada (PDF o Excel)
  const [option, setOption] = useState();

  /**
   * Maneja la generación de reportes según los valores proporcionados.
   * Realiza una búsqueda de datos con las fechas y estado de cintas seleccionados,
   * y exporta los resultados en formato PDF o Excel.
   *
   * @param {Object} values - Valores del formulario (fechas y estado de cintas).
   * @param {Function} resetForm - Función para restablecer el formulario después de la generación de reporte.
   * @returns {void}
   */
  const reportHandler = async (values, resetForm) => {
    let { initialDate, finalDate, statusCinta } = values;
    // Obtiene el estado de cintas correspondiente al ID seleccionado
    statusCinta = status.find(({ id }) => id === statusCinta);
    // Realiza la búsqueda de datos con las fechas y estado de cintas seleccionados
    const data = await searchWithDates(statusCinta.state, initialDate, finalDate);
    // Exporta los datos en el formato seleccionado (PDF o Excel)
    if (option === 'pdf') { await exportPdf(data); }
    if (option === 'excel') { await exportExcel(data); }
    // Restablece el formulario después de la generación de reporte
    resetForm();
  };

  // Renderizado del componente Content
  return (
    <>
      <h2 className="report-title">Generar reportes</h2>
      <section className="reports-input-section col-md-4 col-lg-3">
        {/* Formulario utilizando Formik para manejar la entrada de fechas y estado de cintas */}
        <Formik
          initialValues={initialValues}
          validationSchema={reportsValidationSchema}
          onSubmit={(values, actions) => {
            reportHandler(values, actions.resetForm);
          }}
        >
          <Form>
            {/* Campos de entrada para fechas y estado de cintas */}
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

            {/* Botones para exportar en PDF o Excel */}
            <div className="reports-button-container">
              {/* Botón para exportar en PDF */}
              <ButtonPrimary 
                onClick={() => setOption('pdf')}
                type='submit'
                styles={stylesButton} 
                additionalStyles={{backgroundColor: '#F21D2F', border: '1px solid #F21D2F', padding: '0.4rem 0.6rem'}}
              >
                <PdfSvg />
                Exportar en pdf
              </ButtonPrimary>
              {/* Botón para exportar en Excel */}
              <ButtonPrimary 
                onClick={() => setOption('excel')}
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
  );
};

/**
 * Componente que representa la pantalla de generación de reportes.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de generación de reportes.
 */
export function ReportsScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <SideBar />
      <Header />
      <MainContent content={<Content />} />
    </>
  );
}
