import Link from 'next/link';
import { useRouter } from 'next/router';

export default function InvoiceActions({ invoiceId, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          if (onDelete) {
            onDelete();
          } else {
            router.push('/invoices');
          }
        } else {
          throw new Error('Failed to delete invoice');
        }
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Failed to delete invoice');
      }
    }
  };

  const handleDownloadPDF = () => {
    window.open(`/api/invoices/pdf/${invoiceId}`, '_blank');
  };

  return (
    <div className="flex space-x-2">
      <Link href={`/invoices/${invoiceId}`}>
        <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          View
        </div>
      </Link>
      <Link href={`/invoices/edit/${invoiceId}`}>
        <div className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
          Edit
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Delete
      </button>
      <button
        onClick={handleDownloadPDF}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Download PDF
      </button>
    </div>
  );
}