package com.acap.api.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.acap.api.model.Cintas;

/**
 * Clase para generar archivos Excel (XLSX) con datos de Cintas.
 */
public class GenerateEXCEL {

  /**
   * Constructor privado para evitar instancias de la clase utilitaria.
   */
  private GenerateEXCEL() {
  }

  /**
   * Genera un flujo de bytes que representa un archivo Excel (XLSX) con datos de Cintas.
   *
   * @param cintas Lista de objetos Cintas para incluir en el archivo Excel.
   * @return ByteArrayOutputStream que contiene los datos del archivo Excel.
   * @throws IOException Si ocurre un error de entrada/salida durante la generación del archivo Excel.
   */
  public static ByteArrayOutputStream generateExcelStream(List<Cintas> cintas) throws IOException {
    Workbook workbook = new XSSFWorkbook();
    Sheet sheet = workbook.createSheet("SampleSheet");

    // Encabezados
    String[] headers = {
        "Vicepresidencia de Operaciones & Tecnología",
        "Gerencia de Tecnología",
        "Departamento de Control de Calidad TI",
        "Inventario de Cintas " + LocalDateTime.now().getYear()
    };

    // Estilo para los encabezados
    CellStyle headerStyle = workbook.createCellStyle();
    headerStyle.setAlignment(HorizontalAlignment.CENTER);

    // Agrega los encabezados a la hoja de Excel
    for (int i = 0; i < headers.length; i++) {
      Row headerRow = sheet.createRow(i);
      addRow(0, headers[i], headerRow, headerStyle);
    }

    // Encabezados de la tabla
    String[] tableHeaders = { "Label", "Ubicación", "Fecha Creación", "Fecha Caducidad", "Fecha Retención", "Estado" };

    // Combina las celdas del encabezado
    for (int i = 0; i < headers.length; i++) {
      sheet.addMergedRegion(new CellRangeAddress(i, i, 0, tableHeaders.length - 1));
    }

    // Estilo para los encabezados de la tabla
    Row tableHeaderRow = sheet.createRow(headers.length + 1);
    CellStyle tableHeaderStyle = workbook.createCellStyle();
    tableHeaderStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
    tableHeaderStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    
    // Establece la negrita para los encabezados de la tabla
    XSSFFont font = (XSSFFont) workbook.createFont();
    font.setBold(true);
    tableHeaderStyle.setFont(font);
    
    // Agrega bordes a los encabezados de la tabla
    addBorders(tableHeaderStyle);

    // Agrega los encabezados de la tabla a la hoja de Excel
    for (int i = 0; i < tableHeaders.length; i++) {
      addRow(i, tableHeaders[i], tableHeaderRow, tableHeaderStyle);
    }

    // Estilo para las filas de datos
    CellStyle rowStyle = workbook.createCellStyle();
    addBorders(rowStyle);

    // Agrega los datos de las cintas a la hoja de Excel
    for (int rowIndex = 0; rowIndex < cintas.size(); rowIndex++) {
      Row dataRow = sheet.createRow(rowIndex + headers.length + 2);
      Cintas cinta = cintas.get(rowIndex);

      addRow(0, cinta.getLabel(), dataRow, rowStyle);
      addRow(1, cinta.getLocation().getLocation(), dataRow, rowStyle);
      addRow(2, Integer.parseInt(String.valueOf(cinta.getCreationDate().getYear())), dataRow, rowStyle);
      addRow(3, Integer.parseInt(String.valueOf(cinta.getExpiryDate().getYear())), dataRow, rowStyle);
      addRow(4, Integer.parseInt(String.valueOf(cinta.getRententionDate().getYear())), dataRow, rowStyle);
      addRow(5, cinta.getStatusCinta().getState(), dataRow, rowStyle);
    }

    // Ajusta automáticamente el ancho de las columnas
    for (int i = 0; i < tableHeaders.length; i++) {
      sheet.autoSizeColumn(i);
    }

    // Guarda el archivo Excel en un ByteArrayOutputStream
    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    workbook.write(stream);
    workbook.close();

    return stream;
  }

  /**
   * Agrega una celda a una fila con el valor especificado y aplica el estilo dado.
   *
   * @param column     Índice de la columna.
   * @param value      Valor de la celda.
   * @param row        Fila a la que se debe agregar la celda.
   * @param cellStyle  Estilo de la celda.
   */
  private static void addRow(int column, String value, Row row, CellStyle cellStyle) {
    row.createCell(column).setCellValue(value);
    row.getCell(column).setCellStyle(cellStyle);
  }

  /**
   * Agrega una celda a una fila con el valor especificado y aplica el estilo dado.
   *
   * @param column     Índice de la columna.
   * @param value      Valor de la celda.
   * @param row        Fila a la que se debe agregar la celda.
   * @param cellStyle  Estilo de la celda.
   */
  private static void addRow(int column, int value, Row row, CellStyle cellStyle) {
    row.createCell(column).setCellValue(value);
    row.getCell(column).setCellStyle(cellStyle);
  }

  /**
   * Agrega bordes a un estilo de celda.
   *
   * @param cellStyle  Estilo de la celda al que se agregarán los bordes.
   */
  private static void addBorders(CellStyle cellStyle) {
    cellStyle.setBorderTop(BorderStyle.THIN);
    cellStyle.setBorderBottom(BorderStyle.THIN);
    cellStyle.setBorderLeft(BorderStyle.THIN);
    cellStyle.setBorderRight(BorderStyle.THIN);
  }
}
