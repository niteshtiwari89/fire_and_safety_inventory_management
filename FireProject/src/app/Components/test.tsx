import React from 'react'
import Link from 'next/link'

const Dalla = () => {
    return (
        <div className="space-x-4">
            <Link href="/zero"
                className="bg-purple-600 text-white hover:bg-purple-700">Get Started 
            </Link>
        </div>
    )
}

export default Dalla


// "use client"

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import Modal from '../Modal/PopPage'  // Corrected the casing to match the actual file name

// const records = [
//   { id: 1, image: '/placeholder.svg?height=100&width=100', text: 'Fire Extinguisher' },
//   { id: 2, image: '/placeholder.svg?height=100&width=100', text: 'Fire Alarm' },
//   { id: 3, image: '/placeholder.svg?height=100&width=100', text: 'Fire Hydrant' },
//   { id: 4, image: '/placeholder.svg?height=100&width=100', text: 'Sprinkers' },
//   { id: 5, image: '/placeholder.svg?height=100&width=100', text: 'Fire Buckets' },
//   { id: 6, image: '/placeholder.svg?height=100&width=100', text: 'Firefighter Gloves' },
//   { id: 7, image: '/placeholder.svg?height=100&width=100', text: 'Fire Suit' },
//   { id: 8, image: '/placeholder.svg?height=100&width=100', text: 'Ladders' },
//   { id: 9, image: '/placeholder.svg?height=100&width=100', text: 'Smoke Alarms' },
//   { id: 10, image: '/placeholder.svg?height=100&width=100', text: 'Gas Tight Suit' },
//   { id: 11, image: '/placeholder.svg?height=100&width=100', text: 'Fire Hoses' },
//   { id: 12, image: '/placeholder.svg?height=100&width=100', text: 'Drones' },
// ]



// function Hero() {
//   const router = useRouter()
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal] = useState(false)

//   const handleAddClick = () => {
//     router.push('/zero')
//   }

//   const handleImageClick = (record) => {
//     setSelectedRecord(record)
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setSelectedRecord(null)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
//       <div className="max-w-6xl mx-auto p-4">
//         <header className="flex justify-between items-center mb-6 bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg shadow-lg">
//           <div className="w-24 h-12 relative">
//             <Image
//               src="/placeholder.svg?height=48&width=96"
//               alt="Logo"
//               layout="fill"
//               objectFit="contain"
//             />
//           </div>
//           <div className="space-x-4">
//             <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors hover:shadow-lg">
//               Bills
//             </button>
//             <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors hover:shadow-lg">
//               Records
//             </button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xl font-bold transition-colors hover:shadow-lg">
//               -
//             </button>
//             <button
//               className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xl font-bold transition-colors hover:shadow-lg"
//               onClick={handleAddClick}
//             >
//               +
//             </button>
//           </div>

//         </header>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {records.map((record) => (
//             <div
//               key={record.id}
//               className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
//               onClick={() => handleImageClick(record)}
//             >
//               <div className="relative h-48">
//                 <Image
//                   src={record.image}
//                   alt={record.text}
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               </div>
//               <div className="p-4 text-center">{record.text}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal showModal={showModal} record={selectedRecord} onClose={handleCloseModal} />
//     </div>
//   )
// }

// export default Hero
