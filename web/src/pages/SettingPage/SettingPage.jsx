import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const SettingPage = () => {
  return (
    <>
      <Metadata title="Settings" description="Settings page" />

      <main className="p-6">
        <h1 className="mb-4 text-2xl font-semibold text-gray-700">Settings</h1>

        <div className="space-y-4">
          <Link
            to={routes.referDoctors()}
            className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
          >
            Referral Doctors
          </Link>

          <Link
            to={routes.investigations()}
            className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
          >
            Investigation Type
          </Link>

          <Link
            to={routes.patients()}
            className="block cursor-pointer cursor-pointer rounded-lg bg-indigo-100 p-4 font-medium text-indigo-800 hover:bg-indigo-200"
          >
            Patients
          </Link>
        </div>
      </main>
    </>
  )
}

export default SettingPage
