import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        const response = await fetch(`/api/invoices/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchInvoices();
        }
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Invoices</h1>
        <Link href="/invoices/new">
          <div className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Create New Invoice
          </div>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {invoices && invoices.map((invoice) => (
              <tr key={invoice._id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{invoice.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">₹{invoice.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-4">
                  <Link href={`/invoices/${invoice._id}`}>
                    <div className="inline-block text-purple-400 hover:text-purple-300 transition-colors">
                      View
                    </div>
                  </Link>
                  <Link href={`/invoices/edit/${invoice._id}`}>
                    <div className="inline-block text-yellow-400 hover:text-yellow-300 transition-colors">
                      Edit
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                  <Link href={`/api/invoices/pdf/${invoice._id}`}>
                    <div className="inline-block text-green-400 hover:text-green-300 transition-colors">
                      Download PDF
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}