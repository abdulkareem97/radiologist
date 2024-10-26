import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

const SearchTable = (props) => {
  return (
    <div className="grid grid-cols-6">
      <div className=" col-span-6 mx-6  my-5 rounded-lg p-3 font-bold">
        <div className="flex ">
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-blue-800 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="focus:border-red-00 block w-full rounded-lg border border-blue-800 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={props.placeholder}
                onChange={props.change}
                required
              />
            </div>
          </form>
        </div>
      </div>
      <ReactTable
        data={props.search_data}
        columns={props.columns}
        defaultPageSize={props.rows_count}
        className="-striped -highlight col-span-6 m-6 rounded-lg"
        // pageSizeOptions = {[2,4, 6]}
      />
    </div>
  )
}

export default SearchTable
