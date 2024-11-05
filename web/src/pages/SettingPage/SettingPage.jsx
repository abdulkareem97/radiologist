import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
const SettingPage = () => {
  const { isAuthenticated, signUp, logOut, currentUser } = useAuth()
  return (
    <>
      <Metadata title="Settings" description="Settings page" />

      <main className="p-6">
        <h1 className="mb-4 text-2xl font-semibold text-gray-700">Settings</h1>

        <div className="space-y-4">
          {currentUser.roles == 'admin' && (
            <Link
              to={routes.referDoctors()}
              className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
            >
              Referral Doctors
            </Link>
          )}

          {currentUser.roles == 'admin' && (
            <Link
              to={routes.investigations()}
              className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
            >
              Investigation Type
            </Link>
          )}

          <Link
            to={routes.patients()}
            className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
          >
            Patients
          </Link>
          {currentUser.roles == 'admin' && (
            <Link
              to={routes.signup()}
              className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
            >
              Add Users
            </Link>
          )}
          <button
            onClick={logOut}
            className="block w-full cursor-pointer cursor-pointer rounded-lg bg-red-100 p-4 font-medium text-indigo-800 hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      </main>
    </>
  )
}

export default SettingPage
