package com.acap.api.utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.BarcodeImageHandler;

/**
 * Clase utilitaria para generar códigos de barras utilizando el estándar 3 of
 * 9.
 */
public class BarCodeGenerator {

  // Dimensiones del código de barras y configuraciones de texto
  private static final int BARCODE_WIDTH = 275;
  private static final int BARCODE_HEIGHT = 25;
  private static final Font BARCODE_TEXT_FONT = new Font("Arial", Font.PLAIN, 6);
  private static final int TEXT_MARGIN = -10; // Espacio entre el código de barras y el texto
  private static final float FONT_SIZE_TEXT = 18;

  // Constructor privado para evitar instancias de la clase
  private BarCodeGenerator() {
  }

  /**
   * Genera un código de barras 3 of 9 con texto adicional debajo del código.
   *
   * @param barcodeText El texto que se codificará en el código de barras.
   * @return Una imagen BufferedImage que representa el código de barras.
   * @throws Exception Si hay algún error al generar el código de barras.
   */
  public static BufferedImage generateBarCode3Of9(String barcodeText) throws Exception {
    // Crea un objeto Barcode utilizando el estándar 3 of 9
    Barcode barcode = BarcodeFactory.create3of9(barcodeText, false);
    barcode.setFont(BARCODE_TEXT_FONT);

    // Obtiene la imagen del código de barras
    BufferedImage barcodeImage = BarcodeImageHandler.getImage(barcode);

    // Extiende la altura de la imagen para incluir espacio para el texto adicional
    int newHeight = barcodeImage.getHeight() + BARCODE_TEXT_FONT.getSize() + TEXT_MARGIN;
    BufferedImage combinedImage = new BufferedImage(BARCODE_WIDTH, newHeight, BufferedImage.TYPE_INT_ARGB);

    // Dibuja el código de barras original en la nueva imagen
    Graphics2D g2d = combinedImage.createGraphics();
    g2d.drawImage(barcodeImage, 0, 0, BARCODE_WIDTH, BARCODE_HEIGHT, null);

    // Configura la fuente y el tamaño para el texto adicional
    Font textFont = BARCODE_TEXT_FONT.deriveFont(FONT_SIZE_TEXT);
    g2d.setFont(textFont);

    // Obtiene métricas de la fuente para el cálculo del ancho del texto
    FontMetrics fontMetrics = g2d.getFontMetrics();
    int textWidth = fontMetrics.stringWidth(barcodeText);

    // Calcula el espacio entre letras para que el texto ocupe el mismo ancho que el
    // código
    int letterSpacing = (BARCODE_WIDTH - textWidth) / (barcodeText.length() - 1);

    // Configura el color del texto
    g2d.setColor(Color.BLACK);

    // Dibuja el texto adicional debajo del código de barras con el mismo ancho que
    // el código
    int textX = 0;
    int textY = barcodeImage.getHeight() + BARCODE_TEXT_FONT.getSize() + TEXT_MARGIN;
    for (int i = 0; i < barcodeText.length(); i++) {
      char charToDraw = barcodeText.charAt(i);
      g2d.drawChars(new char[] { charToDraw }, 0, 1, textX, textY);
      textX += fontMetrics.charWidth(charToDraw) + letterSpacing;
    }

    // Libera los recursos de gráficos
    g2d.dispose();

    // Retorna la imagen combinada con el texto adicional
    return combinedImage;
  }
}
