import { useState } from 'react';
import { useRouter } from 'next/router';

export default function InvoiceForm({ initialData }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData || {
    invoiceNumber: '',
    customerName: '',
    items: [{ particulars: '', quantity: 0, rate: 0, amount: 0 }],
    totalAmount: 0
  });

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: calculateTotal(newItems)
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { particulars: '', quantity: 0, rate: 0, amount: 0 }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = initialData ? `/api/invoices/${initialData._id}` : '/api/invoices';
    const method = initialData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/invoices');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Invoice Number</label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">Items</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-700 rounded-lg">
              <input
                type="text"
                value={item.particulars}
                onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                placeholder="Item description"
                className="rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                placeholder="Quantity"
                className="rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
              <input
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                placeholder="Rate"
                className="rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
              <div className="flex items-center">
                <span className="text-gray-200">₹{item.amount}</span>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            Add Item
          </button>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-700">
          <div className="text-xl font-bold text-gray-200">
            Total Amount: ₹{formData.totalAmount}
          </div>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            {initialData ? 'Update Invoice' : 'Create Invoice'}
          </button>
        </div>
      </div>
    </form>
  );
}