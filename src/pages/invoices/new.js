import InvoiceForm from '../../components/InvoiceForm';
import Layout from '../../components/Layout';

export default function NewInvoicePage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>
        <InvoiceForm />
      </div>
    </Layout>
  );
}