// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import ReportLayout from './layouts/ReportLayout/ReportLayout'
import userLayout from './layouts/UserLayout/UserLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />

      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <PrivateSet unauthenticated="login">
        <Set wrap={userLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/signup" page={SignupPage} name="signup" />
          <Route path="/setting" page={SettingPage} name="setting" />
          <Route path="/completed-patient" page={CompletedPatientPage} name="completedPatient" />
          <Route path="/pending-patient" page={PendingPatientPage} name="pendingPatient" />
          <Set wrap={ReportLayout}>
            <Route path="/report" page={ReportPage} name="report" />
          </Set>
          <Route path="/view-all" page={ViewAllPage} name="viewAll" />

          <Set wrap={ScaffoldLayout} title="Records" titleTo="records" buttonLabel="New Record" buttonTo="newRecord">
            <Route path="/records/new" page={RecordNewRecordPage} name="newRecord" />
            <Route path="/records/{id:Int}/edit" page={RecordEditRecordPage} name="editRecord" />
            <Route path="/records/{id:Int}" page={RecordRecordPage} name="record" />
            <Route path="/records" page={RecordRecordsPage} name="records" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Patients" titleTo="patients" buttonLabel="New Patient" buttonTo="newPatient">
            <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
            <Route path="/patients/{id:Int}/edit" page={PatientEditPatientPage} name="editPatient" />
            <Route path="/patients/{id:Int}" page={PatientPatientPage} name="patient" />
            <Route path="/patients" page={PatientPatientsPage} name="patients" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Investigations" titleTo="investigations" buttonLabel="New Investigation" buttonTo="newInvestigation">
            <Route path="/investigations/new" page={InvestigationNewInvestigationPage} name="newInvestigation" />
            <Route path="/investigations/{id:Int}/edit" page={InvestigationEditInvestigationPage} name="editInvestigation" />
            <Route path="/investigations/{id:Int}" page={InvestigationInvestigationPage} name="investigation" />
            <Route path="/investigations" page={InvestigationInvestigationsPage} name="investigations" />
          </Set>
          <Set wrap={ScaffoldLayout} title="ReferDoctors" titleTo="referDoctors" buttonLabel="New ReferDoctor" buttonTo="newReferDoctor">
            <Route path="/refer-doctors/new" page={ReferDoctorNewReferDoctorPage} name="newReferDoctor" />
            <Route path="/refer-doctors/{id:Int}/edit" page={ReferDoctorEditReferDoctorPage} name="editReferDoctor" />
            <Route path="/refer-doctors/{id:Int}" page={ReferDoctorReferDoctorPage} name="referDoctor" />
            <Route path="/refer-doctors" page={ReferDoctorReferDoctorsPage} name="referDoctors" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Bookings" titleTo="bookings" buttonLabel="New Booking" buttonTo="newBooking">
            <Route path="/bookings/new" page={BookingNewBookingPage} name="newBooking" />
            <Route path="/bookings/{id:Int}/edit" page={BookingEditBookingPage} name="editBooking" />
            <Route path="/bookings/{id:Int}" page={BookingBookingPage} name="booking" />
            <Route path="/bookings" page={BookingBookingsPage} name="bookings" />
          </Set>
          <Set wrap={ScaffoldLayout} title="FunctionHalls" titleTo="functionHalls" buttonLabel="New FunctionHall" buttonTo="newFunctionHall">
            <Route path="/function-halls/new" page={FunctionHallNewFunctionHallPage} name="newFunctionHall" />
            <Route path="/function-halls/{id:Int}/edit" page={FunctionHallEditFunctionHallPage} name="editFunctionHall" />
            <Route path="/function-halls/{id:Int}" page={FunctionHallFunctionHallPage} name="functionHall" />
            <Route path="/function-halls" page={FunctionHallFunctionHallsPage} name="functionHalls" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
          </Set>
        </Set>
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
