package com.acap.api.utils;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

import com.acap.api.model.Cintas;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class GeneratePDF {

  private static Font titleSize = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD);
  private static Font normalSizeBold = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
  private static Font normalSize = new Font(Font.FontFamily.TIMES_ROMAN, 12);

  private GeneratePDF() {
  }

  public static ByteArrayOutputStream generatePdfStream(List<Cintas> cintas)
      throws DocumentException {

    Document document = new Document();
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, outputStream);

    document.open();

    addTitle(document, "Vicepresidencia de Operaciones & Tecnología");
    addTitle(document, "Gerencia de Tecnología");
    addTitle(document, "Departamento de Control de Calidad TI");
    addTitle(document, "Inventario de Cintas " + LocalDateTime.now().getYear());

    PdfPTable table = new PdfPTable(6);
    table.setSpacingBefore(15);
    table.setWidthPercentage(100f);

    PdfPCell cell = new PdfPCell();
    cell.setPadding(5);

    addCellHeader(cell, table, "Label");
    addCellHeader(cell, table, "Ubicación");
    addCellHeader(cell, table, "Creación");
    addCellHeader(cell, table, "Caduca");
    addCellHeader(cell, table, "Retención");
    addCellHeader(cell, table, "Estado");

    for (Cintas data : cintas) {
      addCell(table, data.getLabel());
      addCell(table, data.getLocation().getLocation());
      addCell(table, String.valueOf(data.getCreationDate().getYear()));
      addCell(table, String.valueOf(data.getExpiryDate().getYear()));
      addCell(table, String.valueOf(data.getRententionDate().getYear()));
      addCell(table, String.valueOf(data.getStatusCinta().getState()));
    }

    document.add(table);

    document.close();
    return outputStream;
  }

  private static void addTitle(Document document, String text) throws DocumentException {
    Paragraph title = new Paragraph(text, titleSize);
    title.setAlignment(Element.ALIGN_CENTER);
    document.add(title);
  }

  private static void addCellHeader (PdfPCell cell, PdfPTable table, String text) {
    cell.setPhrase(new Phrase(text, normalSizeBold));
    table.addCell(cell);
  }

  private static void addCell(PdfPTable table, String data) {
    PdfPCell cell = new PdfPCell(new Phrase(data, normalSize));
    cell.setPadding(5);
    table.addCell(cell);
  }
}