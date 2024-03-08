import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { MainContent } from '../components/MainContent'

import SearchSvg from '../assets/search.svg?react'
import SignatureSvg from '../assets/signature.svg?react'

import '../styles/screens/shippingRegisterScreen.css'
import { ButtonSecundary } from '../components/ButtonSecondary'
import { CreatableInputSelect } from '../components/CreatableInputSelect'
import { Table } from '../components/TableMoveCintas'
import { Dialog } from '../components/Dialog.jsx'

import { saveLocation } from "../api/saveLocation.js"
import { useContext, useState } from 'react'
import { useGetDrivers } from '../hooks/useGetDrivers.js'
import { saveDriver } from '../api/saveDriver.js'
import { ButtonPrimary } from '../components/ButtonPrimary.jsx'
import { ContentDialogShippingRegister } from '../components/ContentDialogShippingRegister.jsx'
import { ContentDialogSignature } from '../components/ContentDialogSignature.jsx'
import { NOT_BRANCH_OFFICES, SUPER_USER_BRANCH_OFFICE } from '../constants.js'
import { UserContext } from '../contexts/userContext.jsx'
import { useGetPartialLocations } from '../hooks/useGetPartialLocations.js'
import { getCintaByLabel } from '../api/getCintaByLabel.js'
import { processedCintasData } from '../utils/processedCintasData.js'
import { useBarcodeScanner } from '../hooks/useBarcodeScanner.js'
import { uploadSignatureImage } from '../api/upLoadSignatureImage.js'
import { saveSignaturePath } from '../api/saveSignaturePath.js'
import { saveShipment } from '../api/saveShipment.js'
import { useNavigate } from 'react-router-dom'
import { sendMessage } from '../api/webSocket.js'
import { saveShipmentNotification } from '../api/saveShipmentNotification.js'
import { formatDate, getDataObject } from '../utils/formatDateData.js'

/**
 * Componente que representa la pantalla de registro de envío de cintas.
 * Permite seleccionar cintas, ubicación, chofer y realizar la firma del envío.
 * Utiliza estilos definidos en el archivo 'shippingRegisterScreen.css'.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de registro de envío de cintas.
 */
const Content = () => {
  // Contexto del usuario para obtener información del usuario actual.
  const { user } = useContext(UserContext);
  // Navegador de React para redireccionar a otras páginas.
  const navigate = useNavigate();
  // Estado para almacenar la lista de ubicaciones disponibles.
  const [locations, setLocations] = useGetPartialLocations([NOT_BRANCH_OFFICES, user.location.location].flat());
  // Estado para almacenar la lista de choferes disponibles.
  const [drivers, setDrivers] = useGetDrivers();
  // Estado para la ubicación seleccionada en el formulario.
  const [locationValue, setLocationValue] = useState(null);
  // Estado para el chofer seleccionado en el formulario.
  const [driverValue, setDriverValue] = useState(null);
  // Estado para almacenar la lista de cintas seleccionadas para el envío.
  const [cintas, setCintas] = useState([]);
  // Estado para controlar la visibilidad del modal de búsqueda de cintas.
  const [modalShow, setModalShow] = useState(false);
  // Estado para controlar la visibilidad del modal de firma.
  const [modalShowSignature, setModalShowSignature] = useState(false);
  // Estado para almacenar los datos de la firma.
  const [signatureData, setSignatureData] = useState(null);

  // Función para manejar el escaneo del código de barras de una cinta.
  const handleBarCode = async (barCode) => {
    console.log(barCode);
    const cinta = await getCintaByLabel(barCode);
    const processedResult = processedCintasData(cinta);
    const userLocation = user.location.location;
    let filterData;

    if (userLocation === SUPER_USER_BRANCH_OFFICE) {
      const filterValues = [NOT_BRANCH_OFFICES, userLocation].flat();
      filterData = processedResult.filter(item => filterValues.includes(item.location));
      setCintas(prevCintas => [...prevCintas, ...filterData]);
      return;
    }

    filterData = processedResult.filter(item => userLocation.includes(item.location));
    setCintas(prevCintas => [...prevCintas, ...filterData]);
  };

  // Hook personalizado para el manejo del escáner de códigos de barras.
  useBarcodeScanner(handleBarCode);

  // Función para abrir el modal de búsqueda de cintas.
  const handleSearhCinta = () => {
    setModalShow(true);
  };

  // Función para abrir el modal de firma.
  const handleSing = () => {
    setModalShowSignature(true);
  };

  // Función para registrar el envío de cintas.
  const handleRegister = async () => {
    if (signatureData !== null && cintas.length !== 0 && locationValue !== null && driverValue !== null) {
      const driver = drivers.find(({ id }) => id === driverValue);
      const locationTo = locations.find(({ id }) => id === locationValue);
      const locationFrom = user.location;
      const filePath = await uploadSignatureImage(signatureData, driver.name);
      const signature = await saveSignaturePath(filePath);
      const shipment = await saveShipment({ dataShipment: { user, signature, driver, locationFrom, locationTo }, cintas: cintas });
      const message = "Tiene un envío a su sucursal";
      await saveShipmentNotification({ dataNotification: { shipment: shipment[0].shipments, message } });

      const dataObject = getDataObject(shipment[0].shipments.date);
      const formattedDate = formatDate(dataObject);
      sendMessage({
        message: message,
        date: formattedDate,
        location: shipment[0].shipments.locationTo.location
      });

      // Redirige a la página de envíos después de completar el registro.
      navigate('/shipments');
    }
  };

  return (
    <>
      <h2 className='shipping-register-title'>Registrar envío de cintas</h2>

      {/* Contenedor de entrada para ubicación, chofer y botón para firma */}
      <div className='input-container-shipping-register col-md-4 col-lg-3 col-xl-2'>
        {/* Botón para seleccionar cintas */}
        <ButtonSecundary onClick={handleSearhCinta} styles={{ padding: '0.3rem 0.7rem', width: '100%', color: '#6F6F6F' }}>
          <div className='button-container-shipping-register'>
            <span>Seleccionar cinta</span>
            <SearchSvg />
          </div>
        </ButtonSecundary>
        {/* Input para seleccionar ubicación */}
        <CreatableInputSelect
          style={{ borderColor: "var(--main-color)", margin: "0" }}
          placeholder={'Seleccionar ubicación'}
          optionsData={locations}
          setOptionsData={setLocations}
          value={locationValue}
          setValue={setLocationValue}
          atributes={['location']}
          createFunction={saveLocation}
        />
        {/* Input para seleccionar chofer */}
        <CreatableInputSelect
          style={{ borderColor: "var(--main-color)", margin: "0" }}
          placeholder={'Seleccionar chofer'}
          optionsData={drivers}
          setOptionsData={setDrivers}
          value={driverValue}
          setValue={setDriverValue}
          atributes={['name']}
          createFunction={saveDriver}
        />
        {/* Botón para realizar la firma */}
        <ButtonSecundary onClick={handleSing} styles={{ padding: '0.3rem 0.7rem', width: '100%', color: '#6F6F6F' }}>
          <div className='button-container-signature-shipping-register'>
            <SignatureSvg />
            <span>Realizar firma</span>
          </div>
        </ButtonSecundary>
      </div>

      {/* Condicionalmente renderiza la lista de cintas seleccionadas */}
      {cintas.length !== 0 ? (
        <section className='items-section-shipping-register-screen'>
          {/* Tabla para mostrar detalles de las cintas */}
          <Table
            columns={['Label: ', 'Ubicación actual:', 'Descripción', 'Creación:', 'Caduca:', 'Retención:', 'Estado:']}
            atributes={['label', 'location', 'description', 'creationDate', 'expiryDate', 'rententionDate', 'statusCinta']}
            data={cintas}
            setData={setCintas}
          />
          {/* Botón para guardar el registro de envío */}
          <ButtonPrimary onClick={handleRegister}>Guardar</ButtonPrimary>
        </section>
      ) : (
        <div></div>
      )}

      {/* Modal para la búsqueda de cintas */}
      <Dialog
        ContentDialog={
          <ContentDialogShippingRegister
            data={cintas}
            setData={setCintas}
            setModalShow={setModalShow}
          />
        }
        styles={{ width: '90%', top: '30%', transform: 'translate(-50%, -30%)' }}
        title={'BuscarCinta'}
        open={modalShow}
      />

      {/* Modal para la firma */}
      <Dialog
        ContentDialog={
          <ContentDialogSignature
            setData={setSignatureData}
            setModalShow={setModalShowSignature}
          />
        }
        styles={{ width: '90%', top: '30%', transform: 'translate(-50%, -30%)' }}
        title={'Firmar'}
        open={modalShowSignature}
      />
    </>
  );
};

/**
 * Componente principal que representa la pantalla de registro de envío de cintas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de registro de envío de cintas.
 */
export function ShippingRegisterScreen() {
  return (
    <>
      {/* Barra lateral */}
      <SideBar />
      {/* Barra de encabezado */}
      <Header />
      {/* Contenido principal que incluye el formulario de registro de envío de cintas */}
      <MainContent content={<Content />} />
    </>
  )
}
