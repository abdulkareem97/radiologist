import { Link, routes } from "@redwoodjs/router"
import { useState } from "react";
import { useAuth } from "src/auth"
import { MdLocalPharmacy, MdPayments } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import { BsPersonFillAdd, BsFillArrowRightCircleFill, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
// import { FaPersonCirclePlus } from "react-icons/fi";
import { Toaster } from "@redwoodjs/web/toast";

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const [dropDownOpen, setDropDownOpen] = useState('')
  const [prevtext, setPrevText] = useState('')
  const isAdmin = currentUser?.roles == 'admin'
  console.log(currentUser)


  const toggleDropDown = (text) => {
    if (prevtext == text) {
      setDropDownOpen('')
      setPrevText('')
      return
    }
    setDropDownOpen(text)
    setPrevText(text)



  }
  return (
    <>
      <div x-data="setup()"
      //  :class="{'dark': isDark }"
      >

        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-white">
          {/* Header */}
          <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-gray-800 border-none">
              <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-full overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
              <span className="hidden md:block"> {currentUser.email} </span>
              {/* <span className="hidden md:block"> {'hello'} </span> */}
            </div>
            <div className="flex justify-end items-center h-14 bg-gray-800 w-full">

              <ul className="flex items-center">

                <li>
                  <div className="block w-px h-6 mx-3 bg-gray-700" />
                </li>
                <li>
                  <button className="flex items-center mr-4 hover:text-blue-100" onClick={logOut}>
                    <span className="inline-flex mr-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* ./Header */}
          {/* Sidebar */}
          <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
              <ul className="flex flex-col py-4 space-y-1">



                {/* {(currentUser.permissions?.charges?.length > 0 || isAdmin) && */}




                  <>
                    <li className="px-5 hidden md:block">
                      <div className="flex flex-row items-center mt-5 h-8">
                        <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Function Hall</div>
                      </div>
                    </li>


              {      <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link to={routes.functionHalls()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                          <span className="inline-flex justify-center items-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">Add Detail</span>

                        </Link>
                      </li>
                    </>}
              {      <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link to={routes.bookings()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                          <span className="inline-flex justify-center items-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">Book </span>

                        </Link>
                      </li>
                    </>}
              {      <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link to={routes.viewAll()} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6">
                          <span className="inline-flex justify-center items-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">View All </span>

                        </Link>
                      </li>
                    </>}



                  </>


              </ul>
              <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2024</p>
            </div>
          </div>
          {/* ./Sidebar */}
          <div className="h-full ml-14 mt-14 mb-10 md:ml-64">

            {children}

          </div>
        </div>
      </div >


    </>
  )
}

export default DashboardLayout
