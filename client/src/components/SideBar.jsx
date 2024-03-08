import '../styles/components/sideBar.css'
import Home from '../assets/home.svg?react'
import Inventory from '../assets/inventory.svg?react'
import Evidence from '../assets/evidence.svg?react'
import Permitions from '../assets/permitions.svg?react'
import Reports from '../assets/reports.svg?react'
import Users from '../assets/users.svg?react'
import Logout from '../assets/logout.svg?react'
import AddBox from '../assets/addBox.svg?react'
import Shipping from '../assets/shipping.svg?react'
import History from '../assets/history.svg?react'
import RightRow from '../assets/rightRow.svg?react'
import DownRow from '../assets/dowRow.svg?react'

import { Option } from './Option'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { ACCESS, TOKEN_NAME } from '../constants'
import { AccessibleOption } from './AccesibleOption'
import { deleteCookie } from '../utils/deleteCookie'
import { logout } from '../api/logout'

/**
 * Componente `SideBar` para representar la barra lateral de opciones de navegación.
 *
 * @component
 * @example
 * return <SideBar />;
 */
export function SideBar() {
  const { clearUser, permissions } = useContext(UserContext);

  /**
   * Manejador de eventos para cerrar sesión.
   * @async
   * @function
   */
  const handleLogOut = async () => {
    clearUser();
    await logout();
    deleteCookie(TOKEN_NAME);
  };

  return (
    <nav className='side-bar'>
      <div className='options'>
        <Option name={'Inicio'} href={'/'} svg={<Home />} />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.VIEW_SHIPMENTS}
          Option={<Option name={'Envíos'} href={'/shipments'} svg={<AddBox />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.MOVE_DATA_CENTER}
          Option={<Option name={'Mover'} href={'/move'} svg={<RightRow />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.RECEPTION}
          Option={<Option name={'Recepción'} href={'/reception'} svg={<Shipping />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.VIEW_RECEIVED_SHIPMENTS}
          Option={<Option name={'Recibidos'} href={'/receivedCintas'} svg={<DownRow />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.VIEW_HISTORY_SHIPMENTS}
          Option={<Option name={'Historial'} href={'/shipments/history'} svg={<History />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.VIEW_INVENTORY}
          Option={<Option name={'Inventario'} href={'/inventory'} svg={<Inventory />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.VIEW_EVIDENCE}
          Option={<Option name={'Evidencias'} href={'/evidence'} svg={<Evidence />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.REPORTS}
          Option={<Option name={'Reportes'} href={'/reports'} svg={<Reports />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.VIEW_USERS}
          Option={<Option name={'Usuarios'} href={'/users'} svg={<Users />} />}
        />

        <AccessibleOption
          permissions={permissions}
          privilegesId={ACCESS.ASSING_PRIVILEGES}
          Option={<Option name={'Permisos'} href={'/permissions'} svg={<Permitions />} />}
        />

        <Option name={'Salir'} href={'/login'} onClickFunction={handleLogOut} svg={<Logout />} />
      </div>
    </nav>
  );
}