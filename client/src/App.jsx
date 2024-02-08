import { Routes, Route } from 'react-router-dom'
import { ACCESS } from './constants'
import { lazyLoad } from './lazyLoad'
import { Suspense } from 'react'
import { LoadingScreen } from './screens/LoadingScreen'

const LoginScreen = lazyLoad('./screens/LoginScreen', 'LoginScreen')
const Dashboard = lazyLoad('./screens/DashboardScreen', 'Dashboard')
const InventoryScreen = lazyLoad('./screens/InventoryScreen', 'InventoryScreen')
const CreateCintaScreen = lazyLoad('./screens/CreateCintaScreen', 'CreateCintaScreen')
const ReportsScreen = lazyLoad('./screens/ReportsScreen', 'ReportsScreen')
const EvidenceScreen = lazyLoad('./screens/EvidenceScreen', 'EvidenceScreen')
const CreateFolderScreen = lazyLoad('./screens/createFolderScreen', 'CreateFolderScreen')
const UsersScreen = lazyLoad('./screens/UsersScreen', 'UsersScreen')
const CreateUserScreen = lazyLoad('./screens/CreateUserScreen', 'CreateUserScreen')
const ProfileScreen = lazyLoad('./screens/ProfileScreen', 'ProfileScreen')
const ChangePasswordScreen = lazyLoad('./screens/ChangePasswordScreen', 'ChangePasswordScreen')
const MoveScreen = lazyLoad('./screens/MoveScreen', 'MoveScreen')
const PermissionsScreen = lazyLoad('./screens/PermissionsScreen', 'PermissionsScreen')
const ShipmentsScreen = lazyLoad('./screens/ShipmentsScreen', 'ShipmentsScreen')
const ShipmentsDetailsScreen = lazyLoad('./screens/ShipmentsDetailsScreen', 'ShipmentsDetailsScreen')
const ReceptionScreen = lazyLoad('./screens/ReceptionScreen', 'ReceptionScreen')
const ReceptionDetailsScreen = lazyLoad('./screens/ReceptionDetailsScreen', 'ReceptionDetailsScreen')
const ReceivedCintasScreen = lazyLoad('./screens/ReceivedCintasScreen', 'ReceivedCintasScreen')
const ReceivedCintasDetailsScreen = lazyLoad('./screens/receivedCintasDetailsScreen', 'ReceivedCintasDetailsScreen')
const ShipmentsHistoryScreen = lazyLoad('./screens/ShipmentsHistoryScreen', 'ShipmentsHistoryScreen')
const ShippingRegisterScreen = lazyLoad('./screens/ShippingRegisterScreen', 'ShippingRegisterScreen')
const AccessDeniedScreen = lazyLoad('./screens/AccessDeniedScreen', 'AccessDeniedScreen')
const PrivateRoute = lazyLoad('./components/PrivateRoute', 'PrivateRoute')

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />

        <Route path='/dashboard' element={<PrivateRoute Element={Dashboard} />} />
        <Route path='/inventory' element={<PrivateRoute Element={InventoryScreen} requiredPermissions={ACCESS.VIEW_INVENTORY} />} />
        <Route path='/move' element={<PrivateRoute Element={MoveScreen} requiredPermissions={ACCESS.MOVE_DATA_CENTER} />} />
        <Route path='/shipments' element={<PrivateRoute Element={ShipmentsScreen} requiredPermissions={ACCESS.VIEW_SHIPMENTS} />} />
        <Route path='/shipments/register' element={<PrivateRoute Element={ShippingRegisterScreen} requiredPermissions={ACCESS.REGISTER_SHIPMENT} />} />
        <Route path='/shipments/details' element={<PrivateRoute Element={ShipmentsDetailsScreen} requiredPermissions={ACCESS.VIEW_SHIPMENTS} />} />
        <Route path='/reception' element={<PrivateRoute Element={ReceptionScreen} requiredPermissions={ACCESS.RECEPTION} />} />
        <Route path='/reception/details' element={<PrivateRoute Element={ReceptionDetailsScreen} requiredPermissions={ACCESS.RECEPTION} />} />
        <Route path='/receivedCintas' element={<PrivateRoute Element={ReceivedCintasScreen} requiredPermissions={ACCESS.VIEW_RECEIVED_SHIPMENTS} />} />
        <Route path='/receivedCintas/details' element={<PrivateRoute Element={ReceivedCintasDetailsScreen} requiredPermissions={ACCESS.VIEW_RECEIVED_SHIPMENTS} />} />
        <Route path='/shipments/history' element={<PrivateRoute Element={ShipmentsHistoryScreen} requiredPermissions={ACCESS.VIEW_HISTORY_SHIPMENTS} />} />
        <Route path='/createCinta' element={<PrivateRoute Element={CreateCintaScreen} requiredPermissions={ACCESS.CREATE_CINTA} />} />
        <Route path='/reports' element={<PrivateRoute Element={ReportsScreen} requiredPermissions={ACCESS.REPORTS} />} />
        <Route path='/evidence' element={<PrivateRoute Element={EvidenceScreen} requiredPermissions={ACCESS.VIEW_EVIDENCE} />} />
        <Route path='/createFolder' element={<PrivateRoute Element={CreateFolderScreen} requiredPermissions={ACCESS.VIEW_EVIDENCE} />} />
        <Route path='/users' element={<PrivateRoute Element={UsersScreen} requiredPermissions={ACCESS.VIEW_USERS} />} />
        <Route path='/createUser' element={<PrivateRoute Element={CreateUserScreen} requiredPermissions={ACCESS.CREATE_USER} />} />
        <Route path='/profile' element={<PrivateRoute Element={ProfileScreen} />} />
        <Route path='/changePassword' element={<PrivateRoute Element={ChangePasswordScreen} />} />
        <Route path='/permissions' element={<PrivateRoute Element={PermissionsScreen} requiredPermissions={ACCESS.ASSING_PRIVILEGES} />} />
        <Route path='/access/denied' element={<AccessDeniedScreen />} />

      </Routes>
    </Suspense>
  )
}

export default App