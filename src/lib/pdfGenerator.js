import PDFDocument from 'pdfkit';

export function generateInvoicePDF(invoice, stream) {
  const doc = new PDFDocument();
  doc.pipe(stream);

  // Add header
  doc.fontSize(20).text('CASH MEMO / BILL', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('Vijay Arts', { align: 'center' });
  doc.fontSize(10).text('103, GANPAT AWAS SAMITI, CORONEL LANE, MAHEWA, PRAYAGRAJ - 211 007', { align: 'center' });
  doc.moveDown();

  // Add invoice details
  doc.fontSize(12);
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`);
  doc.text(`Customer Name: ${invoice.customerName}`);
  doc.moveDown();

  // Add table headers
  const tableTop = doc.y;
  doc.text('Sl. No.', 50, tableTop);
  doc.text('Particulars', 100, tableTop);
  doc.text('Qty', 300, tableTop);
  doc.text('Rate', 400, tableTop);
  doc.text('Amount', 500, tableTop);

  // Add items
  let y = tableTop + 20;
  invoice.items.forEach((item, index) => {
    doc.text((index + 1).toString(), 50, y);
    doc.text(item.particulars, 100, y);
    doc.text(item.quantity.toString(), 300, y);
    doc.text(`₹${item.rate}`, 400, y);
    doc.text(`₹${item.amount}`, 500, y);
    y += 20;
  });

  // Add total
  doc.moveDown();
  doc.text(`Total Amount: ₹${invoice.totalAmount}`, 400);

  // Add footer
  doc.moveDown(2);
  doc.fontSize(10);
  doc.text('Bank Details:', 50);
  doc.text('Bank of Baroda, Mahewa Branch');
  doc.text('A/c No.: 58018100003942');
  doc.text('IFSC Code: BARB0MAHEWA');
  
  doc.moveDown();
  doc.text('For Vijay Arts', { align: 'right' });
  doc.moveDown();
  doc.text('Authorized Signature', { align: 'right' });

  doc.end();
}