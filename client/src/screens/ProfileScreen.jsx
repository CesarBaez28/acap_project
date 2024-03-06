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

/**
 * Contenido específico de la pantalla de perfil de usuario.
 * Permite visualizar y editar la información del usuario, así como gestionar la seguridad de la cuenta.
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la interfaz de la pantalla de perfil de usuario.
 */
const Content = () => {
  // Contexto de usuario para acceder a la información del usuario actual y sus funciones de actualización
  const { user, updateUser } = useContext(UserContext);
  // Estado para controlar la visibilidad del modal de edición de perfil
  const [modalShow, setModalShow] = useState(false);

  /**
   * Maneja la acción de editar el perfil del usuario.
   *
   * @returns {void}
   */
  const handleEditProfile = () => {
    setModalShow(true);
  };

  // Renderizado del componente Content
  return (
    <>
      <h2 className="profile-title">Perfil de usuario</h2>

      {/* Sección de información del usuario */}
      <section className="section-user-info col-md-4 col-lg-3">
        <Card>
          <h5>Datos del usuario</h5>
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
              {/* Botón para editar el perfil del usuario */}
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

      {/* Sección de seguridad de la cuenta */}
      <section className="section-security-account col-md-4 col-lg-3">
        <Card>
          <h5>Seguridad de la cuenta</h5>
          <div className="change-password-container">
            {/* Enlace para cambiar la contraseña */}
            <ButtonSecundaryLink
              href={'/changePassword'}
              styles={{ padding: ".4rem .6rem" }}
            >
              Cambiar contraseña
            </ButtonSecundaryLink>
          </div>
        </Card>
      </section>

      {/* Modal para editar el perfil del usuario */}
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
  );
};

/**
 * Componente que representa la pantalla de perfil de usuario.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de perfil de usuario.
 */
export function ProfileScreen() {
  return (
    <>
      {/* Estructura principal de la página */}
      <SideBar />
      <Header />
      <MainContent content={<Content />} />
    </>
  );
}
