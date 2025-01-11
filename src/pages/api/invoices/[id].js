import dbConnect from '../../../lib/mongodb';
import Invoice from '../../../models/Invoice';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(invoice);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const invoice = await Invoice.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!invoice) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(invoice);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const invoice = await Invoice.findByIdAndDelete(id);
        if (!invoice) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}