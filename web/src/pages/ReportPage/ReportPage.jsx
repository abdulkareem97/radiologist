import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const ReportPage = () => {
  return (
    <>
      <Metadata title="Report" description="Report page" />

      <h1>ReportPage</h1>
      <p>
        Find me in <code>./web/src/pages/ReportPage/ReportPage.jsx</code>
      </p>
      <p>
        My default route is named <code>report</code>, link to me with `
        <Link to={routes.report()}>Report</Link>`
      </p>
    </>
  )
}

export default ReportPage
