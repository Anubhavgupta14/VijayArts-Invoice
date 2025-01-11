import { useState } from 'react';
import { useRouter } from 'next/router';
import RequiredInput from './RequiredInput';

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

  const deleteItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: calculateTotal(newItems)
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
    <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RequiredInput 
            label="Invoice Number"
            value={formData.invoiceNumber}
            onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
            type="text"
          />
          <RequiredInput 
            label="Customer Name"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            type="text"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">Items</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-700 rounded-lg">
              <RequiredInput
                label="Particulars"
                type="text"
                value={item.particulars}
                onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                placeholder="Item description"
              />
              <RequiredInput
                type="number"
                label={`Quantity`}
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                placeholder="Quantity"
                className="rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <RequiredInput
                type="number"
                label={`Rate`}
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                placeholder="Rate"
                className="rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <RequiredInput
                label={`Amount`}
                value={`₹${item.amount}`}
                disabled = {true}
                className="rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => deleteItem(index)}
                  className=" px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {initialData ? 'Update Invoice' : 'Create Invoice'}
          </button>
        </div>
      </div>
    </form>
  );
}