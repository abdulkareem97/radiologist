import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const PendingPatientPage = () => {
  return (
    <>
      <Metadata title="PendingPatient" description="PendingPatient page" />

      <h1>PendingPatientPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/PendingPatientPage/PendingPatientPage.jsx</code>
      </p>
      <p>
        My default route is named <code>pendingPatient</code>, link to me with `
        <Link to={routes.pendingPatient()}>PendingPatient</Link>`
      </p>
    </>
  )
}

export default PendingPatientPage
