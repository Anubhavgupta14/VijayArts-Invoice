import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  customerName: {
    type: String,
    required: true
  },
  items: [{
    particulars: String,
    quantity: Number,
    rate: Number,
    amount: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Yet to send'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);