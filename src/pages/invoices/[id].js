import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export default function InvoiceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const response = await fetch(`/api/invoices/${id}`);
      const data = await response.json();
      setInvoice(data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Invoice #{invoice.invoiceNumber}</h1>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/api/invoices/pdf/${id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Customer Name</p>
              <p className="font-medium">{invoice.customerName}</p>
            </div>
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-medium">{new Date(invoice.date).toLocaleDateString()}</p>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200 mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2">Particulars</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.particulars}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">₹{item.rate}</td>
                  <td className="px-4 py-2 text-right">₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right">
            <p className="text-xl font-bold">Total Amount: ₹{invoice.totalAmount}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}