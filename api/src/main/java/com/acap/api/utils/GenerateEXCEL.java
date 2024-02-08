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

public class GenerateEXCEL {

  private GenerateEXCEL() {
  }

  public static ByteArrayOutputStream generateExcelStream(List<Cintas> cintas) throws IOException {

    Workbook workbook = new XSSFWorkbook();
    Sheet sheet = workbook.createSheet("SampleSheet");

    String[] headers = {
        "Vicepresidencia de Operaciones & Tecnología",
        "Gerencia de Tecnología",
        "Departamento de Control de Calidad TI",
        "Inventario de Cintas " + LocalDateTime.now().getYear()
    };

    CellStyle headerStyle = workbook.createCellStyle();
    headerStyle.setAlignment(HorizontalAlignment.CENTER);

    for (int i = 0; i < headers.length; i++) {
      Row headerRow = sheet.createRow(i);
      addRow(0, headers[i], headerRow, headerStyle);
    }

    String[] tableHeaders = { "Label", "Ubicación", "Fecha Creación", "Fecha Caducidad", "Fecha Retención", "Estado" };

    for (int i = 0; i < headers.length; i++) {
      // Combina las celdas del encabezado
      sheet.addMergedRegion(new CellRangeAddress(i, i, 0, tableHeaders.length - 1));
    }

    Row tableHeaderRow = sheet.createRow(headers.length + 1);
    CellStyle tableHeaderStyle = workbook.createCellStyle();
    tableHeaderStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
    tableHeaderStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    
    XSSFFont font = (XSSFFont) workbook.createFont();
    font.setBold(true);
    tableHeaderStyle.setFont(font);
    
    addBorders(tableHeaderStyle);

    for (int i = 0; i < tableHeaders.length; i++) {
      addRow(i, tableHeaders[i], tableHeaderRow, tableHeaderStyle);
    }

    CellStyle rowStyle = workbook.createCellStyle();
    addBorders(rowStyle);
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

    for (int i = 0; i < tableHeaders.length; i++) {
      sheet.autoSizeColumn(i); // Ajustar el ancho de la columna automáticamente
    }

    ByteArrayOutputStream stream = new ByteArrayOutputStream();
    workbook.write(stream);
    workbook.close();

    return stream;
  }

  private static void addRow(int column, String value, Row row, CellStyle cellStyle) {
    row.createCell(column).setCellValue(value);
    row.getCell(column).setCellStyle(cellStyle);
  }

  private static void addRow(int column, int value, Row row, CellStyle cellStyle) {
    row.createCell(column).setCellValue(value);
    row.getCell(column).setCellStyle(cellStyle);
  }

  private static void addBorders(CellStyle cellStyle) {
    cellStyle.setBorderTop(BorderStyle.THIN);
    cellStyle.setBorderBottom(BorderStyle.THIN);
    cellStyle.setBorderLeft(BorderStyle.THIN);
    cellStyle.setBorderRight(BorderStyle.THIN);
  }
}
