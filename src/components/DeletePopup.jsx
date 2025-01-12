export default function DeletePopup({ isOpen, onClose, onConfirm, deleteLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">Confirm Delete</h3>
        <p className="text-gray-300 mb-6">Are you sure you want to delete this invoice? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white bg-gray-700 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
