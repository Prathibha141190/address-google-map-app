// src/AddressForm.js
import React, { useState } from 'react';

const AddressForm = () => {
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('home');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the entered data (you can replace this with actual saving logic)
    console.log({
      house,
      area,
      category
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Enter Address Details</h2>
      <form onSubmit={handleSubmit}>
        {/* House/Flat/Block No. Field */}
        <div className="mb-4">
          <label htmlFor="house" className="block text-sm font-medium text-gray-700">House/Flat/Block No.</label>
          <input
            id="house"
            type="text"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Apartment/Road/Area Field */}
        <div className="mb-4">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">Apartment/Road/Area</label>
          <input
            id="area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-6 bg-gray-600">
          <label className="block text-sm font-medium text-gray-700">Select Category</label>
          <div className="flex justify-around mt-2">
            <button
              type="button"
              onClick={() => setCategory('home')}
              className={`p-4 rounded-lg ${category === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setCategory('office')}
              className={`p-4 rounded-lg ${category === 'office' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Office
            </button>
            <button
              type="button"
              onClick={() => setCategory('friends')}
              className={`p-4 rounded-lg ${category === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Friends & Family
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
