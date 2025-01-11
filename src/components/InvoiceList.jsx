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
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link href="/invoices/new">
          <div className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Create New Invoice
          </div>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices && invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">₹{invoice.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link href={`/invoices/${invoice._id}`}>
                    <div className="text-indigo-600 hover:text-indigo-900">View</div>
                  </Link>
                  <Link href={`/invoices/edit/${invoice._id}`}>
                    <div className="text-yellow-600 hover:text-yellow-900">Edit</div>
                  </Link>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                  <Link href={`/api/invoices/pdf/${invoice._id}`}>
                    <div className="text-green-600 hover:text-green-900">Download PDF</div>
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