import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import ViewAll from 'src/components/ViewAllCell'

const ViewAllPage = () => {
  return (
    <>
      <Metadata title="ViewAll" description="ViewAll page" />

      <ViewAll />


    </>
  )
}

export default ViewAllPage
