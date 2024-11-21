"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RecordType = 'buy' | 'sell'

interface Record {
  date: string
  itemName: string
  type: RecordType
  batchNo: string
  quantity: number
  price: number
  size: string
}

export default function RecordsPage() {
  const router = useRouter()
  const [records, setRecords] = useState<Record[]>([])
  const [filter, setFilter] = useState<RecordType | 'all'>('all')
  const [newRecord, setNewRecord] = useState<Record>({
    date: '',
    itemName: '',
    type: 'buy',
    batchNo: '',
    quantity: 0,
    price: 0,
    size: ''
  })

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('http://localhost:5000/record')
      const data = await response.json()
      setRecords(data)
    }

    fetchRecords()
  }, [])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewRecord(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // setRecords(prev => [...prev, newRecord])
    // setNewRecord({
    //   date: '',
    //   itemName: '',
    //   type: 'buy',
    //   batchNo: '',
    //   quantity: 0,
    //   price: 0,
    //   size: ''
    // })

    const response = await fetch('http://localhost:5000/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecord)
    })

    if (response.ok) {
      const savedRecord = await response.json()
      setRecords(prev => [...prev, savedRecord])
      setNewRecord({
        date: '',
        itemName: '',
        type: 'buy',
        batchNo: '',
        quantity: 0,
        price: 0,
        size: ''
      })
    } else {
      console.error('Failed to save the record')
    }
  }

  const downloadFile = async () =>{
    const response = await fetch('http://localhost:5000/record/download', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
  
    if (!response.ok) {
      console.error('Failed to download the Excel file')
      return
    }
  
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'records.xlsx') // Set the name of the downloaded file
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const filteredRecords = records.filter(record => 
    filter === 'all' ? true : record.type === filter
  )

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
          onClick={() => router.push('/')} 
          className="absolute top-4 right-4 p-2 text-xl font-bold hover:text-gray-300 transition-colors"
        >
          ×
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Records Management</h1>
        
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700 transition-colors`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('buy')}
            className={`px-4 py-2 rounded ${filter === 'buy' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700 transition-colors`}
          >
            Buy
          </button>
          <button
            onClick={() => setFilter('sell')}
            className={`px-4 py-2 rounded ${filter === 'sell' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700 transition-colors`}
          >
            Sell
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Add New Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="itemName" className="block mb-1 text-sm font-medium text-gray-300">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={newRecord.itemName}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newRecord.date}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="batchNo" className="block mb-1 text-sm font-medium text-gray-300">
                  Batch No
                </label>
                <input
                  type="text"
                  id="batchNo"
                  name="batchNo"
                  value={newRecord.batchNo}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-300">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newRecord.type}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  required
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-300">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={newRecord.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newRecord.price}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="size" className="block mb-1 text-sm font-medium text-gray-300">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={newRecord.size}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                  required
                />
              </div>
              <button type="submit" className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors">
                Add Record
              </button>
            </form>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <h2 className="text-2xl font-semibold mb-6">Record List</h2><p><button onClick={downloadFile}>Export to Excel (xlsx)</button></p></div>
            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredRecords.length === 0 ? (
                <p className="text-gray-400 text-center">No records found.</p>
              ) : (
                filteredRecords.map((record, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <p><span className="font-semibold">Date:</span> {record.date}</p>
                      <p><span className="font-semibold">Item:</span> {record.itemName}</p>
                      <p><span className="font-semibold">Type:</span> {record.type}</p>
                      <p><span className="font-semibold">Batch No:</span> {record.batchNo}</p>
                      <p><span className="font-semibold">Quantity:</span> {record.quantity}</p>
                      <p><span className="font-semibold">Price:</span> ${record.price.toFixed(2)}</p>
                      <p><span className="font-semibold">Size:</span> {record.size}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}