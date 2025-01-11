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
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-100">Invoice #{invoice.invoiceNumber}</h1>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/api/invoices/pdf/${id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm">Customer Name</p>
              <p className="font-medium text-gray-100 mt-1">{invoice.customerName}</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm">Date</p>
              <p className="font-medium text-gray-100 mt-1">
                {new Date(invoice.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-700 mb-6">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Particulars
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {invoice.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 text-gray-300">{item.particulars}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{item.quantity}</td>
                    <td className="px-4 py-3 text-right text-gray-300">₹{item.rate}</td>
                    <td className="px-4 py-3 text-right text-gray-300">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-gray-100">
              Total Amount: ₹{invoice.totalAmount}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}