import React, { useState, useEffect } from 'react'
import Image from 'next/image'; // Add this import at the top

interface Item {
  image: string;
  itemName: string;
  price: number;
  capacity: string;
  batchNo: string;
  quantity: number;
}

interface ModalProps {
  showModal: boolean;
  items: Item;
  onClose: () => void;
  onUpdate: (updatedItems: Item) => void;
}

function Modal({ showModal, items, onClose, onUpdate }: ModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState<Item>(items);

  useEffect(() => {
    setEditedItems(items);
  }, [items]);

  if (!showModal) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItems(prevItems => ({
      ...prevItems,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedItems);
    setIsEditing(false);
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-lg p-4 shadow-lg relative">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="md:w-1/2 flex flex-col items-center">
            <Image
              src={items.image}
              alt={items.itemName}
              layout="responsive" // Use layout for responsive behavior
              width={500} // Set appropriate width
              height={300} // Set appropriate height
              className="rounded-lg"
            />
          </div>
          {/* Right: Product Details */}
          <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
            {isEditing ? (
              // Editing mode
              <div>
                <label htmlFor="itemName" className="block text-black font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={editedItems.itemName}
                  onChange={handleInputChange}
                  className="text-black text-lg font-semibold mb-2 w-full border rounded p-1"
                />
                <label htmlFor="price" className="block text-black font-medium mb-1">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editedItems.price}
                  onChange={handleInputChange}
                  className="text-black text-lg mb-2 w-full border rounded p-1"
                />
                <label htmlFor="capacity" className="block text-black font-medium mb-1">Capacity</label>
                <input
                  type="text"
                  id="capacity"
                  name="capacity"
                  value={editedItems.capacity}
                  onChange={handleInputChange}
                  className="text-black mb-2 w-full border rounded p-1"
                />
                <label htmlFor="batchNo" className="block text-black font-medium mb-1">Batch No</label>
                <input
                  type="text"
                  id="batchNo"
                  name="batchNo"
                  value={editedItems.batchNo}
                  onChange={handleInputChange}
                  className="text-black mb-2 w-full border rounded p-1"
                />
                <label htmlFor="quantity" className="block text-black font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={editedItems.quantity}
                  onChange={handleInputChange}
                  className="text-black mb-2 w-full border rounded p-1"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // Display mode
              <div>
                <h2 className="text-2xl font-semibold mb-2">{items.itemName}</h2>
                <p className="text-lg text-gray-600 mb-4">Price: ₹{items.price}</p>
                <table className="table-auto mb-4 text-sm text-gray-700">
                  <tbody>
                    <tr>
                      <td className="pr-4">Capacity:</td>
                      <td>{items.capacity}</td>
                    </tr>
                    <tr>
                      <td className="pr-4">Batch No:</td>
                      <td>{items.batchNo}</td>
                    </tr>
                    <tr>
                      <td className="pr-4">Quantity:</td>
                      <td>{items.quantity}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
