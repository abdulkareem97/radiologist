// import { Toaster } from "@redwoodjs/web/toast"
import { Toaster } from '@redwoodjs/web/toast'

const ReportLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header"></header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ReportLayout
