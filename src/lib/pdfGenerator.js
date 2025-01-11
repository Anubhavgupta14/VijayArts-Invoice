import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function generateInvoicePDF(invoice) {
  try {
    // Read the template PDF file
    const templatePath = path.join(process.cwd(), 'public', 'templates', 'invoice-template.pdf');
    const templateBytes = fs.readFileSync(templatePath);

    // Load the template PDF
    const pdfDoc = await PDFDocument.load(templateBytes);
    
    // Get the first page
    const page = pdfDoc.getPages()[0];

    // Get page dimensions
    const { width, height } = page.getSize();

    // Embed fonts
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Set drawing parameters
    const textColor = rgb(0, 0, 0);
    
    // Helper function to draw text
    const drawText = (text, x, y, {
      fontSize = 10,
      fontStyle = 'regular',
      align = 'left'
    } = {}) => {
      const selectedFont = fontStyle === 'bold' ? boldFont : regularFont;
      let processedText = text.toString();
      
      let xPosition = x;
      if (align === 'right') {
        const textWidth = selectedFont.widthOfTextAtSize(processedText, fontSize);
        xPosition = x - textWidth;
      }

      page.drawText(processedText, {
        x: xPosition,
        y: height - y,
        size: fontSize,
        font: selectedFont,
        color: textColor
      });
    };

    // Draw invoice number and date
    drawText(invoice.invoiceNumber, 450, 160, { fontSize: 15, fontStyle: 'bold', fontfamily: 'Times New Roman' });
    drawText(new Date(invoice.date).toLocaleDateString(), 450, 200, { fontSize: 10 });
    
    // Draw customer name
    drawText(invoice.customerName, 70, 180, { fontSize: 11 });

    // Draw items
    let currentY = 280;
    const lineHeight = 25;

    invoice.items.forEach((item, index) => {
      // Serial number
      drawText((index + 1).toString(), 60, currentY);
      
      // Particulars
      drawText(item.particulars, 100, currentY);
      
      // Quantity
      drawText(item.quantity.toString(), 370, currentY, { align: 'right' });
      
      // Rate
      drawText(`${item.rate.toFixed(2)}`, 445, currentY, { align: 'right' });
      
      // Amount
      drawText(`${item.amount.toFixed(2)}`, 525, currentY, { align: 'right' });
      
      currentY += lineHeight;
    });

    drawText(`Rs. ${invoice.totalAmount.toFixed(2)}`, 535, 685, { fontSize: 11, fontStyle: 'bold', align: 'right' });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}