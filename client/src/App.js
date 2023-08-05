import React, { Component } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import AddItem from './AddItem';
import EditItem from './EditItem';

class App extends Component {
  state = {
    items: [],
    isAddItemFormVisible: false,
    selectedItem: null,
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    axios.get('http://localhost:5000/items')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  handleSelectItem = item => {
    this.setState({ selectedItem: item });
  };

  toggleAddItemFormVisibility = () => {
    this.setState(prevState => ({
      isAddItemFormVisible: !prevState.isAddItemFormVisible,
    }));
  };

  render() {
    const { items, isAddItemFormVisible, selectedItem } = this.state;

    return (
      <div className="bg-purple-100 min-h-screen">
        <header className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-4">List of Utensils</h1>
        <nav>
        <button
          onClick={this.toggleAddItemFormVisibility}
          className="text-white hover:underline mr-4"
        >
          Add Item
        </button>
        </nav>
        </header>
        {isAddItemFormVisible && (
          <AddItem
            fetchItems={this.fetchItems}
            toggleFormVisibility={this.toggleAddItemFormVisibility}
          />
        )}
        <EditItem
          items={items}
          selectedItem={selectedItem}
          fetchItems={this.fetchItems}
          handleSelectItem={this.handleSelectItem}
        />
        <ItemList
          items={items}
          selectedItem={selectedItem}
          fetchItems={this.fetchItems}
          handleSelectItem={this.handleSelectItem}
        />
      </div>
    );
  }
}

export default App;
