import { Header } from "../components/Header"
import { SideBar } from "../components/SideBar"
import { MainContent } from "../components/MainContent"
import { Card } from "../components/Card"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/userContext"
import { ButtonSecundary } from "../components/ButtonSecondary"
import { ButtonSecundaryLink } from "../components/ButtonSecondaryLink"
import { Dialog } from "../components/Dialog"
import { ContentDialogProfile } from "../components/ContentDialogProfile"

import EditSvg from '../assets/edit.svg?react'
import "../styles/screens/profile.css"

const Content = () => {
  const { user, updateUser } = useContext(UserContext)
  const [modalShow, setModalShow] = useState(false)

  const handleEditProfile = () => {
    setModalShow(true)
  }

  return <>
    <h2 className="profile-title ">Perfil de usuario</h2>

    <section className="section-user-info col-md-4 col-lg-3">
      <Card>
        <h5>Datos del usurio</h5>
        <article className="user-info">
          <div className="user-info-container">
            <p className="user-info-title">Nombre: </p>
            <p className="user-info-data">{user?.username}</p>
          </div>
          <div className="user-info-container">
            <p className="user-info-title">Número de empleado: </p>
            <p className="user-info-data">{user?.employeeNumber}</p>
          </div>
          <div className="user-info-container">
            <p className="user-info-title">Email: </p>
            <p className="user-info-data">{user?.email}</p>
          </div>
          <div className="user-info-container">
            <p className="user-info-title">Puesto: </p>
            <p className="user-info-data">{user?.position.position}</p>
          </div>
          <div className="user-info-button">
            <ButtonSecundary
              onClick={handleEditProfile}
              styles={{ padding: ".4rem .6rem" }}
            >
              <EditSvg />
            </ButtonSecundary>
          </div>
        </article>
      </Card>
    </section>

    <section className="section-security-account col-md-4 col-lg-3">
      <Card>
        <h5>Seguridad de la cuenta</h5>
        <div className="change-password-container">
          <ButtonSecundaryLink
            href={'/changePassword'}
            styles={{ padding: ".4rem .6rem" }}
          >
            Cambiar contraseña
          </ButtonSecundaryLink>
        </div>
      </Card>
    </section>

    <Dialog
      ContentDialog={
        <ContentDialogProfile 
          data={user}
          setData={updateUser}
          setModalShow={setModalShow}
        />
      }
      title={'Editar perfil'}
      open={modalShow}
    />
  </>
}

export function ProfileScreen() {
  return <>
    <SideBar />
    <Header />
    <MainContent content={<Content />} />
  </>
}