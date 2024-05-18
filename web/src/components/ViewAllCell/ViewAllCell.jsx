export const QUERY = gql`
  query FindViewAllQuery {
    functionHalls {
      id
      name
      address
      phone_no
      no_of_slot
      slot_price
      slot_names
      desc
      status
      imageUrl
      created_at
      updated_at
      extra
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ functionHalls }) => {
  return (
    <>


    <div className="flex justify-center m-4">
      <span className="text-3xl underline">Book Your Function Hall</span>
    </div>




    <div className="flex space-x-2 p-4 justify-center flex-wrap">
      {
        functionHalls.map((item)=> {
          return (
            <>
                <div className="mt-6 w-96 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                {item.imageUrl?.profileImage}
      <div className="relative h-56">
        <img
          className="w-full h-full object-cover"
          src={item.imageUrl?.profileImage}
          alt="functionHall-image"
        />
      </div>
      <div className="p-4">
        <h5 className="text-xl font-bold text-gray-700 mb-2">
           {item.name}
        </h5>
        <p className="text-gray-600">
          {
            item.address
          }
        </p>
      </div>
      <div className="p-4 pt-0">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Read More
        </button>
      </div>
    </div>

            </>
          )
        })
      }
    </div>


    </>
  )
}
