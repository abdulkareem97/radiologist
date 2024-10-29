import { useEffect, useLayoutEffect, useState } from 'react'

import { DateField, FieldError, Form, Label, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/dist/toast'
import { toast } from '@redwoodjs/web/toast'

import ReportHeaderCell from 'src/components/ReportHeaderCell/ReportHeaderCell'
import ReportReferalDoctorCell from 'src/components/ReportReferalDoctorCell/ReportReferalDoctorCell'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ReportPage = () => {
  // const [defaultstartDate, setdefaultStartDate] = useState(new Date(2022, 1).toISOString().split('T')[0])
  const [today, setToday] = useState(new Date())
  // const [defaultendDate, setdefaultEndDate] = useState(new Date(today.getFullYear() + 1, 1).toISOString().split('T')[0])
  const lastMonth = new Date(today)
  lastMonth.setMonth(today.getMonth() - 1)
  const [defaultstartDate, setdefaultStartDate] = useState(
    new Date(lastMonth).toISOString().split('T')[0]
  )
  const [defaultendDate, setdefaultEndDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [startDate, setStartDate] = useState(defaultstartDate)
  const [endDate, setEndDate] = useState(defaultendDate)
  const [searchId, setSearchId] = useState(0)
  const [render, setRender] = useState(false)

  const changeId = (value) => {
    setSearchId(value)
  }

  const getReport = (data) => {
    if (searchId == 0) {
      toast.error('Select Referal Doctor To get The Report')
      return
    }

    setStartDate(data['date'])
    setEndDate(data['date2'])
    setRender(true)
  }

  return (
    <>
      <div>
        <div className="p-10 text-white">
          <div>
            {<ReportHeaderCell changeId={changeId} text={'Select Doctor'} />}
          </div>
          {
            <div>
              <Form onSubmit={getReport}>
                <div className="mt-3 flex items-center justify-evenly  gap-x-4">
                  <Label
                    name="date"
                    className="rw-label mt-0 text-white"
                    errorClassName="rw-label mt-0 rw-label-error"
                  >
                    From Date
                  </Label>
                  <div className="flex">
                    <DateField
                      name="date"
                      defaultValue={formatDatetime(defaultstartDate)}
                      className="rw-input mt-0"
                      errorClassName="rw-input mt-0 rw-input-error"
                      validation={{ required: true }}
                      // onChange={(val)=>setStartDate(val)}
                    />
                  </div>
                  <FieldError name="date" className="rw-field-error" />

                  <Label
                    name="date2"
                    className="rw-label mt-0 text-white"
                    errorClassName="rw-label mt-0 rw-label-error"
                  >
                    To Date
                  </Label>
                  <div className="flex">
                    <DateField
                      name="date2"
                      defaultValue={formatDatetime(defaultendDate)}
                      className="rw-input mt-0"
                      errorClassName="rw-input mt-0 rw-input-error"
                      validation={{ required: true }}
                      // onChange={(val)=>setEndDate(val)}
                    />
                  </div>
                  <FieldError name="date2" className="rw-field-error" />
                  <div>
                    <Submit className="rw-button rw-button-green">
                      Get Report
                    </Submit>
                  </div>
                </div>
              </Form>
            </div>
          }
        </div>

        <div>
          {render ? (
            <ReportReferalDoctorCell
              id={searchId}
              startDate={startDate}
              endDate={endDate}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default ReportPage
