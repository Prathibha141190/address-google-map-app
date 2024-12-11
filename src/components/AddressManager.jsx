import React, { useState } from 'react';

const AddressManager = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Home', address: '123 Main St, City, Country' },
    { id: 2, name: 'Office', address: '456 Business Rd, City, Country' },
    { id: 3, name: 'Friends & Family', address: '789 Family Ln, City, Country' }
  ]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState({});

  const handleEditClick = (address) => {
    setIsEditing(true);
    setEditAddress(address);
  };

  const handleDeleteClick = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleSaveChanges = () => {
    setAddresses(addresses.map(address =>
      address.id === editAddress.id ? editAddress : address
    ));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditAddress({});
  };

  const filteredAddresses = addresses.filter(address =>
    address.name.toLowerCase().includes(search.toLowerCase()) ||
    address.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Saved Addresses</h1>
      
      <input
        type="text"
        placeholder="Search addresses"
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-4">
        {filteredAddresses.map((address) => (
          <li key={address.id} className="flex items-center justify-between p-4 border rounded">
            <div>
              <h2 className="font-semibold">{address.name}</h2>
              <p>{address.address}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleEditClick(address)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteClick(address.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Edit Address</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            value={editAddress.name}
            onChange={(e) => setEditAddress({ ...editAddress, name: e.target.value })}
            placeholder="Address Name"
          />
          <textarea
            className="w-full p-2 mb-4 border rounded"
            value={editAddress.address}
            onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })}
            placeholder="Full Address"
          />
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;
