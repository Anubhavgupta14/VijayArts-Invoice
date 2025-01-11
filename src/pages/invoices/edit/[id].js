import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import InvoiceForm from '../../../components/InvoiceForm';

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const response = await fetch(`/api/invoices/${id}`);
      if (!response.ok) {
        throw new Error('Invoice not found');
      }
      const data = await response.json();
      setInvoice(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <div className="text-red-400">Error: {error}</div>
            <button
              onClick={() => router.push('/invoices')}
              className="mt-2 text-red-400 hover:text-red-300 transition-colors"
            >
              Return to Invoices
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">
            Edit Invoice #{invoice.invoiceNumber}
          </h1>
          <button
            onClick={() => router.push('/invoices')}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
        <InvoiceForm initialData={invoice} />
      </div>
    </Layout>
  );
}