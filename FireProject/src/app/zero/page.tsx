// "use client"

// import React, { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Modal from '../Modal/PopPage';

// const AddRecord: React.FC = () => {
//   const [formData, setFormData] = useState({
//     itemName: '',
//     price: '',
//     capacity: '',
//     batchNo: '',
//     quantity: ''
//   });
//   const [image, setImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const router = useRouter();

//   const [records, setRecords] = useState<Record[]>([]);
//   const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const storedRecords = JSON.parse(localStorage.getItem('records') || '[]');
//     setRecords(storedRecords);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newRecord: Record = {
//       ...formData,
//       id: Date.now(),
//       image: image || '/placeholder.svg?height=100&width=100',
//       text: formData.itemName // 
//     };
//     const updatedRecords = [...records, newRecord];
//     setRecords(updatedRecords);
//     localStorage.setItem('records', JSON.stringify(updatedRecords));
//     router.push('/');
//   };

//   const handleUpdate = (updatedRecord: Record) => {
//     const updatedRecords = records.map(record =>
//       record.id === updatedRecord.id ? updatedRecord : record
//     );
//     setRecords(updatedRecords);
//     localStorage.setItem('records', JSON.stringify(updatedRecords));
//     setShowModal(false);
//   };

//   const handleRecordClick = (record: Record) => {
//     setSelectedRecord(record);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     router.push('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative mb-8">
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
//           aria-label="Close form"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         <h1 className="text-2xl font-bold mb-6">Upload Item</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="itemName" className="block text-sm font-medium">Item Name</label>
//             <input
//               type="text"
//               id="itemName"
//               name="itemName"
//               value={formData.itemName}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="price" className="block text-sm font-medium">Price</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="capacity" className="block text-sm font-medium">Capacity</label>
//             <input
//               type="text"
//               id="capacity"
//               name="capacity"
//               value={formData.capacity}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="batchNo" className="block text-sm font-medium">Batch No</label>
//             <input
//               type="text"
//               id="batchNo"
//               name="batchNo"
//               value={formData.batchNo}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="image" className="block text-sm font-medium">Item Image</label>
//             <div className="mt-1 flex items-center">
//               {image ? (
//                 <Image src={image} alt="Preview" width={100} height={100} className="object-cover rounded-md" />
//               ) : (
//                 <div className="w-24 h-24 bg-gray-700 border-2 border-dashed rounded-md flex items-center justify-center">
//                   No image
//                 </div>
//               )}
//               <input
//                 type="file"
//                 id="image"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 ref={fileInputRef}
//                 multiple
//                 className="hidden"
//               />
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="ml-5 bg-gray-700 py-2 px-3 border rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-600 focus:outline-none"
//               >
//                 Change
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 rounded text-sm sm:text-base"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* <div className="w-full max-w-4xl">
//         <h2 className="text-2xl font-bold mb-4">Existing Records</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {records.map(record => (
//             <div
//               key={record.id}
//               className="bg-gray-800 p-4 rounded-lg cursor-pointer"
//               onClick={() => handleRecordClick(record)}
//             >
//               <Image src={record.image} alt={record.itemName} width={100} height={100} className="mb-2" />
//               <h3 className="font-semibold">{record.itemName}</h3>
//               <p>Price: ₹{record.price}</p>
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {showModal && (
//         <Modal
//           showModal={showModal}
//           record={selectedRecord}
//           onClose={() => setShowModal(false)}
//           onUpdate={handleUpdate}
//         />
//       )}
//     </div>
//   );
// };

// // Add this type definition at the end of the file
// type Record = {
//   id: number;
//   image: string;
//   text: string;
//   itemName: string;
//   price: string;
//   capacity: string;
//   batchNo: string;
//   quantity: string;
// };

// export default AddRecord;

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from '../Modal/PopPage';
import axios from 'axios';

const AddRecord: React.FC = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    price: '',
    capacity: '',
    batchNo: '',
    quantity: ''
  });
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [items, setItems] = useState<Items[]>([]);
  const [selectedItems, setSelectedItems] = useState<Items | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      // try {
      //   const response = await fetch('http://localhost:5000/records'); // Update this URL as needed
      //   const data = await response.json();
      //   setRecords(data);
      // } catch (error) {
      //   console.error('Error fetching records:', error);
      // }
      // try {
      //   const response = await fetch('http://localhost:5000/items'); // Update this URL as needed
      //   const data = await response.json();
      //   // Check if data is an array
      //   if (Array.isArray(data)) {
      //     setItems(data);
      //   } else {
      //     console.error('Fetched data is not an array:', data);
      //     setItems([]); // Set to empty array if not valid
      //   }
      // } catch (error) {
      //   console.error('Error fetching records:', error);
      //   setItems([]); // Handle error by setting records to an empty array
      // }

      try {
        const response = await axios.get('http://localhost:5000/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
        setItems([]); // Handle error by setting items to an empty array
      }
    };

    fetchRecords();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItems: Items = {
      ...formData,
      id: Date.now().toString(), // This will be replaced by the server-generated ID
      image: image || '/placeholder.svg?height=100&width=100',
    };

    try {
      const formDataToSend = new FormData();
      Object.entries(newItems).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (image) {
        const blob = await fetch(image).then(r => r.blob());
        formDataToSend.append('image', blob, 'item-image.png');
      }

      const response = await axios.post('http://localhost:5000/items', formDataToSend);
      setItems(prevItems => [...prevItems, response.data]);
      router.push('/'); // Navigate back after adding
    } catch (error) {
      console.error('Error creating record:', error);
    }
    console.log(items);
  };

  const handleUpdate = async (item: Items) => {
    const updatedItem = items.map(items =>
      items.id === items.id ? item : items
    );
    setItems(updatedItem);
    const response  = await axios.post('http://localhost:5000/')
    setShowModal(false);
  };

  const handleRecordClick = (items: Items) => {
    setSelectedItems(items);
    setShowModal(true);
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative mb-8">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Close form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold mb-6">Upload Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-sm font-medium">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium">Capacity</label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="batchNo" className="block text-sm font-medium">Batch No</label>
            <input
              type="text"
              id="batchNo"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-700 rounded text-sm sm:text-base focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">Item Image</label>
            <div className="mt-1 flex items-center">
              {image ? (
                <Image src={image} alt="Preview" width={100} height={100} className="object-cover rounded-md" />
              ) : (
                <div className="w-24 h-24 bg-gray-700 border-2 border-dashed rounded-md flex items-center justify-center">
                  No image
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="ml-5 bg-gray-700 py-2 px-3 border rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-600 focus:outline-none"
              >
                Change
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-sm sm:text-base"
          >
            Submit
          </button>
        </form>
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          items={selectedItems}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

// Add this type definition at the end of the file
type Items = {
  id: string; // Assuming the server will provide the ID
  image: string;
  itemName: string;
  price: string;
  capacity: string;
  batchNo: string;
  quantity: string;
};

export default AddRecord;




