import React, { Component } from 'react';
import axios from 'axios';

class EditItem extends Component {
  state = {
    editedName: '',
    editedDescription: '',
  };

  handleEditSubmit = id => {
    const { editedName, editedDescription } = this.state;
    axios
      .put(`http://localhost:5000/items/${id}`, { name: editedName, description: editedDescription })
      .then(() => {
        this.setState({ editedName: '', editedDescription: '' });
        this.props.fetchItems();
        this.props.onClose();
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  handleDelete = id => {
    axios
      .delete(`http://localhost:5000/items/${id}`)
      .then(() => {
        this.props.fetchItems();
        this.props.onClose();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  render() {
    const { selectedItem, onClose } = this.props;
    const { editedName, editedDescription } = this.state;

    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${selectedItem ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-purple-300 p-4 shadow-md rounded-lg w-3/4" >
          {selectedItem && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Edit Item</h2>
              <p className="mb-2">Editing: {selectedItem.name}</p>
              <input
                type="text"
                value={editedName}
                onChange={e => this.setState({ editedName: e.target.value })}
                placeholder="New Name"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={editedDescription}
                onChange={e => this.setState({ editedDescription: e.target.value })}
                placeholder="New Description"
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                  onClick={() => {
                    this.handleDelete(selectedItem._id);
                    onClose();
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-orange-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    this.handleEditSubmit(selectedItem._id);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EditItem;
