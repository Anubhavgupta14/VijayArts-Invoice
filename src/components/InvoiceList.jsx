// pages/invoices/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { Toaster, toast } from "sonner";

const TableSkeleton = () => (
  <tbody className="bg-gray-800 divide-y divide-gray-700">
    {[...Array(5)].map((_, index) => (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-20"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex space-x-4">
            <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
);

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const statusOptions = ["Paid", "Pending", "Yet to send"];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/invoices");
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const response = await fetch(`/api/invoices/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Invoice deleted successfully");
          fetchInvoices();
        } else {
          throw new Error('Failed to delete invoice');
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
        toast.error("Failed to delete invoice");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Status updated successfully");
        fetchInvoices();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Invoices</h1>
          <Link href="/invoices/new">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr
                      key={invoice._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {invoice.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={invoice.status || statusOptions[0]}
                          onChange={(e) =>
                            handleStatusChange(invoice._id, e.target.value)
                          }
                          className="bg-gray-700 text-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        ₹{invoice.totalAmount.toLocaleString()}
                      </td>
                      <td className="flex items-center px-6 py-4 whitespace-nowrap space-x-4">
                        <Link href={`/invoices/${invoice._id}`}>
                          <IoEyeSharp 
                            className="inline-block cursor-pointer text-blue-400 hover:text-blue-300 transition-colors text-xl" 
                            title="View"
                          />
                        </Link>
                        <Link href={`/invoices/edit/${invoice._id}`}>
                          <MdModeEdit 
                            className="inline-block cursor-pointer text-yellow-400 hover:text-yellow-300 transition-colors text-xl" 
                            title="Edit"
                          />
                        </Link>
                        <MdDelete
                          onClick={() => handleDelete(invoice._id)}
                          className="text-red-400 hover:text-red-300 transition-colors text-xl cursor-pointer"
                          title="Delete"
                        />
                        <Link href={`/api/invoices/pdf/${invoice._id}`}>
                          <IoMdDownload 
                            className="inline-block text-green-400 cursor-pointer text-xl hover:text-green-300 transition-colors" 
                            title="Download PDF"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}