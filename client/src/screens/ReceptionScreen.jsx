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

const Content = () => {
  const { user } = useContext(UserContext)
  const [shipments, setShipments, isLoading] = useGetShipmentsByStatusAndLocation(user.location.id)
  return <>
    <h2 className="reception-screen-title">Recepción de envíos</h2>

    <ConditionalRender isLoading={isLoading}>
      <section className='reception-list-section col-md-10'>
        {shipments && shipments.length > 0 ? (
          shipments.map((item) => (
            <Details
              key={item.id}
              date={item.formattedDate}
              title={"Movimiento de cinta"}
              content={<ContentSummaryShipments detailsScreen={'/reception/details'} shipments={item} />}
            />
          ))
        ) : (
          <NotFoundMessage text={'No se encontraron envíos'} />
        )}
      </section>
    </ConditionalRender>
  </>
}

export function ReceptionScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}