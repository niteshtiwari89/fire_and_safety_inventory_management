"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Modal from '../Modal/PopPage' // Correct the casing to match the file name

// Remove or comment out the static records array

interface Items {
  _id: string;
  image: string;
  text: string;
  itemName: string;
}

function Hero() {
  // const url = "http://localhost:5000/uploads";
  const router = useRouter()
  const [selectedRecord, setSelectedRecord] = useState<Items | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [items, setItems] = useState<Items[]>([])
  const [navOpen, setNavOpen] = useState(false); // 
  const [isRemoving, setIsRemoving] = useState(false)
  const [selectedForRemoval, setSelectedForRemoval] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState<Items[]>([])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Update this URL as needed
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Items[] = await response.json();
        setItems(data);
        setFilteredItems(data); // Initialize filteredItems with all items
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  console.log(items)
  
  // useEffect(() => {
  //   if (items.length === 0) return;

  //   const filtered =items.filter((item) =>
  //     item && item.text && item.text.toLowerCase().includes(searchTerm.toLowerCase())
  //   // item.text.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  //   setFilteredItems(filtered);
  // }, [searchTerm, items]);
  
  const handleAddClick = () => {
    router.push('/zero')
  }

  const handleImageClick = (item: Items) => {
    setSelectedRecord(item)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedRecord(null)
  }

  const handleRecordsClick = () => {
    router.push('/records')
  }

  const handleRemoveClick = () => {
    setIsRemoving(!isRemoving)
    setSelectedForRemoval([])
  }

  const handleRecordSelection = (id: string) => {
    setSelectedForRemoval(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }
  console.log(filteredItems)
  console.log(selectedForRemoval);

  const handleRemoveSelected = async () => {
    try {
      // Send DELETE requests for each selected record
      const deletePromises = selectedForRemoval.map(id =>
        fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" })
      );
  
      // Await all promises
      const responses = await Promise.all(deletePromises);
  
      // Check responses for success or failure
      const errors = responses.filter(response => !response.ok);
      if (errors.length > 0) {
        throw new Error('Some records could not be deleted.');
      }
  
      // Update the records state by filtering out the removed records
      const updatedItems = items.filter(item => !selectedForRemoval.includes(item._id));
      setItems(updatedItems);
      
      // Update local storage
      localStorage.setItem('records', JSON.stringify(updatedItems));
  
      // Reset state
      setIsRemoving(false);
      setFilteredItems([])
      setSelectedForRemoval([]);
    } catch (error) {
      console.error('Error removing records:', error);
    }
    
  }

  const handleUpdateModal = () => {
    // Add your update logic here
  }

  const handleSearch = () => {
    const filtered = items.filter(item =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.text && item.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredItems(filtered);
  }

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredItems(items);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-4">

        
        <header className="flex justify-between items-center mb-6 bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg shadow-lg flex-wrap">
          <div className="w-24 h-12 relative flex-shrink-0">
            <Image
              src=""    // yaha image dalna hai
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-2 items-center max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch();
                  }}
                  className="w-40 px-4 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition-colors hover:shadow-lg"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <button 
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors hover:shadow-lg" 
              onClick={() => setNavOpen(!navOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <div 
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
              navOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col space-y-4 mt-4">
              <div className="md:hidden flex space-x-2 items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleSearch();
                    }}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  />
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition-colors hover:shadow-lg"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <button 
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors hover:shadow-lg w-full"
                onClick={handleRecordsClick}
              >
                Records
              </button>
              <button
                className={`px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors hover:shadow-lg w-full`}
                onClick={handleAddClick}
              >
                Add Item
              </button>
              <button
                className={`px-4 py-2 ${isRemoving ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} rounded-md transition-colors hover:shadow-lg w-full`}
                onClick={handleRemoveClick}
              >
                {isRemoving ? 'Cancel Remove' : 'Remove Item'}
              </button>
              {isRemoving && (
                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md transition-colors hover:shadow-lg w-full"
                  onClick={handleRemoveSelected}
                >
                  Confirm Remove
                </button>
              )}
            </div>
          </div>
        </header>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                isRemoving ? 'cursor-pointer' : ''
              } ${selectedForRemoval.includes(item._id) ? 'border-4 border-red-500' : ''}`}
              onClick={() => isRemoving ? handleRecordSelection(item._id) : handleImageClick(item)}
            >
              <div className="relative h-48">

                <Image
                  src={`${item.image}`}
                  alt={item.itemName}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {isRemoving && (
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedForRemoval.includes(item._id)}
                      onChange={() => handleRecordSelection(item._id)}
                      className="w-5 h-5"
                    />
                  </div>
                )}
              </div>
              <div className="p-4 text-center">{item.itemName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal showModal={showModal} items={selectedRecord} onClose={handleCloseModal} onUpdate={handleUpdateModal} />
    </div>
  )
}

export default Hero