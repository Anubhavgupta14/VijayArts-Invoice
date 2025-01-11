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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Items</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <input
                type="text"
                value={item.particulars}
                onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                placeholder="Item description"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                placeholder="Quantity"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                placeholder="Rate"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="flex items-center">
                <span className="mr-2">₹{item.amount}</span>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Item
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            Total Amount: ₹{formData.totalAmount}
          </div>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {initialData ? 'Update Invoice' : 'Create Invoice'}
          </button>
        </div>
      </div>
    </form>
  );
}