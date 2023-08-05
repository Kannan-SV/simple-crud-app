import React, { useState } from 'react';
import EditItem from './EditItem';

const ItemList = ({ items, deleteItem }) => {
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item

  const handleEditClick = item => {
    setSelectedItem(item); // Set the selected item for editing
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Items List</h2>
      <ul>
        {items.map(item => (
          <li key={item._id} className="mb-4 p-4 border rounded">
            <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEditClick(item)} // Trigger editing when button is clicked
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded ml-2"
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedItem && <EditItem selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default ItemList;
