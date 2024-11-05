import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <img
          src="/radilogo.png"
          alt="Centered Image"
          className="h-auto w-1/3"
        />
      </div>
    </>
  )
}

export default HomePage
