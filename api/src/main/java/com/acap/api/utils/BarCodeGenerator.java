package com.acap.api.utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.BarcodeImageHandler;

public class BarCodeGenerator {

  private static final int BARCODE_WIDTH = 275; 
  private static final int BARCODE_HEIGHT = 25; 
  private static final Font BARCODE_TEXT_FONT = new Font("Arial", Font.PLAIN, 6);
  private static final int TEXT_MARGIN = -10; // Espacio entre el código de barras y el texto
  private static final float FONT_SIZE_TEXT = 18;

  private BarCodeGenerator() {
  }

  public static BufferedImage generateBarCode3Of9(String barcodeText) throws Exception {
    Barcode barcode = BarcodeFactory.create3of9(barcodeText, false);
    barcode.setFont(BARCODE_TEXT_FONT);

    BufferedImage barcodeImage = BarcodeImageHandler.getImage(barcode);

    // Extiende la altura de la imagen para incluir espacio para el texto adicional
    int newHeight = barcodeImage.getHeight() + BARCODE_TEXT_FONT.getSize() + TEXT_MARGIN;
    BufferedImage combinedImage = new BufferedImage(BARCODE_WIDTH, newHeight, BufferedImage.TYPE_INT_ARGB);

    // Dibuja el código de barras original en la nueva imagen
    Graphics2D g2d = combinedImage.createGraphics();
    g2d.drawImage(barcodeImage, 0, 0, BARCODE_WIDTH, BARCODE_HEIGHT, null);

    Font textFont = BARCODE_TEXT_FONT.deriveFont(FONT_SIZE_TEXT);
    g2d.setFont(textFont);

    FontMetrics fontMetrics = g2d.getFontMetrics();
    int textWidth = fontMetrics.stringWidth(barcodeText);

    //calcula espacio entre letras para que el texto ocupe el mismo ancho que el código
    int letterSpacing = (BARCODE_WIDTH - textWidth) / (barcodeText.length() - 1);

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

    g2d.dispose();

    return combinedImage;
  }
}
