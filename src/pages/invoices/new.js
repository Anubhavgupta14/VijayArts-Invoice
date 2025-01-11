import InvoiceForm from '../../components/InvoiceForm';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

export default function NewInvoicePage() {
    const router = useRouter();
  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">
            Create New Invoice
          </h1>
          <button
            onClick={() => router.push('/invoices')}
                        className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Back
          </button>
        </div>
        <InvoiceForm />
      </div>
    </Layout>
  );
}