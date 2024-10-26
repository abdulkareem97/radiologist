import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const CompletedPatientPage = () => {
  return (
    <>
      <Metadata title="CompletedPatient" description="CompletedPatient page" />

      <h1>CompletedPatientPage</h1>
      <p>
        Find me in{' '}
        <code>
          ./web/src/pages/CompletedPatientPage/CompletedPatientPage.jsx
        </code>
      </p>
      <p>
        My default route is named <code>completedPatient</code>, link to me with
        `<Link to={routes.completedPatient()}>CompletedPatient</Link>`
      </p>
    </>
  )
}

export default CompletedPatientPage
