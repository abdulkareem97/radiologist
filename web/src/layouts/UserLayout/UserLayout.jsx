import { useState } from 'react'

import {
  FaHome,
  FaClipboard,
  FaUserClock,
  FaUserCheck,
  FaCog,
} from 'react-icons/fa'

import { Link, routes } from '@redwoodjs/router'

const UserLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>

      {/* Bottom Navigation - visible on all screen sizes */}
      <nav className="fixed inset-x-0 bottom-0 bg-white shadow-md">
        <div className="flex justify-around py-2">
          <Link
            to={routes.home()}
            onClick={() => setActiveTab('Home')}
            className={`flex flex-col items-center ${
              activeTab === 'Home' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <FaHome size={24} />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to={routes.report()}
            onClick={() => setActiveTab('Report')}
            className={`flex flex-col items-center ${
              activeTab === 'Report' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <FaClipboard size={24} />
            <span className="text-xs">Report</span>
          </Link>

          <Link
            to={routes.records()}
            onClick={() => setActiveTab('Pending')}
            className={`flex flex-col items-center ${
              activeTab === 'Pending' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <FaUserClock size={24} />
            <span className="text-xs">Pending</span>
          </Link>

          <Link
            to={routes.completedPatient()}
            onClick={() => setActiveTab('Completed')}
            className={`flex flex-col items-center ${
              activeTab === 'Completed' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <FaUserCheck size={24} />
            <span className="text-xs">Completed</span>
          </Link>

          <Link
            to={routes.setting()}
            onClick={() => setActiveTab('Settings')}
            className={`flex flex-col items-center ${
              activeTab === 'Settings' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <FaCog size={24} />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default UserLayout
