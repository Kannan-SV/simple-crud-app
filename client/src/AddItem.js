import React, { Component } from 'react';
import axios from 'axios';

class AddItem extends Component {
  state = {
    name: '',
    description: '',
    isFormVisible: true,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addItem = () => {
    const { name, description } = this.state;
    axios.post('http://localhost:5000/items/add', { name, description })
      .then(() => {
        this.setState({ name: '', description: '' });
        this.props.fetchItems();
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  toggleFormVisibility = () => {
    this.setState(prevState => ({
      isFormVisible: !prevState.isFormVisible,
      name: '',
      description: '', // Clear the form fields when closing
    }));
  };

  render() {
    const { name, description, isFormVisible } = this.state;

    return (
      <div className={`bg-gray-300 p-4 shadow-md rounded-lg ${isFormVisible ? '' : 'hidden'}`}>
        <h2 className="text-lg font-semibold mb-2">Add Item</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={this.addItem}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          Add Item
        </button>
        <button
          onClick={this.toggleFormVisibility}
          className="bg-red-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    );
  }
}

export default AddItem;
