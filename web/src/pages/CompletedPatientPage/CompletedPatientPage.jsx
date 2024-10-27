import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import RecordsCell from 'src/components/Record/RecordsCell'

const CompletedPatientPage = () => {
  return (
    <>
      <Metadata title="CompletedPatient" description="CompletedPatient page" />

      <RecordsCell status="Completed" />
    </>
  )
}

export default CompletedPatientPage
