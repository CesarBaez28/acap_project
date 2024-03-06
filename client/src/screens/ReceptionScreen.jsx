import { SideBar } from "../components/SideBar"
import { Header } from "../components/Header"
import { MainContent } from "../components/MainContent"
import '../styles/screens/receptionScreen.css'
import { Details } from "../components/Details"
import { ContentSummaryShipments } from "../components/ContentSummaryShipments"
import { useContext } from "react"
import { UserContext } from "../contexts/userContext"
import { useGetShipmentsByStatusAndLocation } from "../hooks/useGetShipmentsByStatusAndLocation"
import { NotFoundMessage } from "../components/NotFoundMessage"
import { ConditionalRender } from "../components/ConditionalRender"
import { filterDataById } from "../utils/filterData"
import { deleteShipment } from "../api/deleteShipment"

/**
 * Contenido específico de la pantalla de recepción de envíos de cintas.
 * Permite visualizar y gestionar la recepción de envíos, así como eliminar envíos recibidos.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de recepción de envíos de cintas.
 */
const Content = () => {
  // Contexto de usuario para acceder a la información del usuario actual
  const { user } = useContext(UserContext);
  // Hooks para obtener y gestionar la información de los envíos de cintas por estado y ubicación
  const [shipments, setShipments, isLoading] = useGetShipmentsByStatusAndLocation(user.location.id);

  /**
   * Maneja la acción de eliminar un envío recibido.
   * Realiza una llamada a la API para eliminar el envío y actualiza el estado local.
   *
   * @param {number} id - Identificador único del envío a eliminar.
   * @returns {void}
   */
  const handleDelete = async (id) => {
    const response = await deleteShipment(id);
    if (response === 200) {
      // Filtra y actualiza los envíos eliminando el envío con el ID proporcionado
      filterDataById(shipments, setShipments, id);
    }
  };

  // Renderizado del componente Content
  return (
    <>
      <h2 className="reception-screen-title">Recepción de envíos</h2>

      {/* Renderiza condicionalmente el mensaje de carga */}
      <ConditionalRender isLoading={isLoading}>
        <section className='reception-list-section col-md-10'>
          {/* Renderiza los detalles de los envíos o un mensaje de no encontrados */}
          {shipments && shipments.length > 0 ? (
            shipments.map((item) => (
              <Details
                key={item.id}
                date={item.formattedDate}
                title={"Movimiento de cinta"}
                content={<ContentSummaryShipments 
                  detailsScreen={'/reception/details'} 
                  deleteFunction={() => handleDelete(item.id)}
                  shipments={item} 
                />}
              />
            ))
          ) : (
            <NotFoundMessage text={'No se encontraron envíos'} />
          )}
        </section>
      </ConditionalRender>
    </>
  );
};

/**
 * Componente que representa la pantalla de recepción de envíos de cintas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de recepción de envíos de cintas.
 */
export function ReceptionScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <SideBar />
      <Header />
      <MainContent content={<Content />} />
    </>
  );
}
