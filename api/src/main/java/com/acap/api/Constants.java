package com.acap.api;

public class Constants {
  private Constants() {}

  public static final Long DELIVERED_STATUS_ID = (long) 12;
  public static final Long EXPIRED_STATUS_ID = (long) 2;
  public static final Long RETAINED_STATUS_ID = (long) 4;

  public static class Roles {
    private Roles () {}

    public static final String VIEW_INVENTORY = "Visualizar cintas";
    public static final String CREATE_CINTA = "Crear cinta";
    public static final String EDIT_CINTA = "Editar cinta";
    public static final String DELETE_CINTA = "Eliminar cinta";
    public static final String VIEW_USERS = "Visualizar usuarios";
    public static final String CREATE_USER = "Crear usuario";
    public static final String EDIT_USER = "Editar usuario";
    public static final String DELETE_USER = "Eliminar usuario";
    public static final String ASSING_PRIVILEGES = "Asignar privilegios";
    public static final String VIEW_EVIDENCE = "Ver evidencias";
    public static final String ADD_EVIDENCE = "Añadir evidencia";
    public static final String EDIT_EVIDENCE = "Editar evidencia";
    public static final String DELETE_EVIDENCE = "Eliminar evidencia";
    public static final String REPORTS = "Generar reportes";
    public static final String VIEW_SHIPMENTS = "Ver envíos";
    public static final String REGISTER_SHIPMENT = "Registrar envío";
    public static final String MOVE_DATA_CENTER = "Mover a centro de datos";
    public static final String RECEPTION = "Recepción";
    public static final String VIEW_RECEIVED_SHIPMENTS = "Ver cintas recibidas";
    public static final String VIEW_HISTORY_SHIPMENTS = "Ver historial de cintas";
  }
}
