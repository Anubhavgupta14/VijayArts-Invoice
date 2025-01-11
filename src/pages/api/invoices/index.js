import dbConnect from '../../../lib/mongodb';
import Invoice from '../../../models/Invoice';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        res.status(200).json(invoices);
      } catch (error) {
        res.status(400).json({ success: false, error: error });
        console.log(error,"from backend")
      }
      break;

    case 'POST':
      try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json(invoice);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}