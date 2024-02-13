/* eslint-disable no-unused-vars */
export const API = 'http://localhost:8080'
export const WebSocketUrl = 'ws://localhost:8080/notifications'
export const LOCATIONS_NOT_ALLOWED_TO_MOVE_CINTAS = ['Rincón Largo']
export const NOT_BRANCH_OFFICES = ['Centro de datos']
export const SUPER_USER_BRANCH_OFFICE = 'E30'
export const NOT_STATUS_CINTAS = ['Recibido', 'Entregado', 'Pendiente', 'Cancelado']
export const PENDING_STATUS_ID = 13
export const DELIVERED_STATUS_ID = 12
export const RECEIVED_STATUS_ID = 11

export const ACCESS = {
  VIEW_INVENTORY: 1,
  CREATE_CINTA: 2,
  EDIT_CINTA: 3,
  DELETE_CINTA: 4,
  VIEW_USERS: 5,
  CREATE_USER: 6,
  EDIT_USER: 7,
  DELETE_USER: 8,
  ASSING_PRIVILEGES: 9,
  VIEW_EVIDENCE: 10,
  ADD_EVIDENCE: 11,
  EDIT_EVIDENCE: 12,
  DELETE_EVIDENCE: 13,
  REPORTS: 14,
  VIEW_SHIPMENTS: 15,
  REGISTER_SHIPMENT: 16,
  MOVE_DATA_CENTER: 17,
  RECEPTION: 18,
  VIEW_RECEIVED_SHIPMENTS: 19,
  VIEW_HISTORY_SHIPMENTS: 20  
}