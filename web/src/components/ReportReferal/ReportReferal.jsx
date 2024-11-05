import { useEffect, useState } from 'react'

import * as XLSX from 'xlsx'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

// import { useState } from 'react-js-dialog-box'
// import { QUERY } from 'src/components/PurchaseMedicine/PurchaseMedicinesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

//var TableToExcel = require('table-to-excel')

const ReportReferal = ({ reportReferalDoctor, startDate, endDate }) => {
  const [download, setDownload] = useState(false)
  const downloadFile = () => {
    setTimeout(() => {
      var data = document.getElementById('download_excel')

      var file = XLSX.utils.table_to_book(data, { sheet: 'sheet1' })
      // for (const sheetName of Object.keys(file.Sheets)) {
      //   const sheet = file.Sheets[sheetName]
      //   for (const cellAddress of Object.keys(sheet)) {
      //     const cell = sheet[cellAddress]
      //     // if (cell.t === 'n') {
      //     //   cell.t = 's'; // Change the type to 's' (string/text)
      //     //   cell.v = `${cell.v}`; // Prefix the value with a single quote
      //     // }
      //   }
      // }

      // Apply bold formatting to rows based on date changes

      XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' })
      XLSX.writeFile(file, 'ReferalDoctor.xlsx')

      setDownload(false)
    }, 2)
  }

  useEffect(() => {
    if (download) {
      downloadFile()
    }
  }, [download])

  const newFormateDate = (dt) => {
    const date = new Date(dt)
    // console.log(date, dt)
    const day = String(date.getDate()).padStart(2, '0') // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0') // Get month (0-based) and pad with leading zero if necessary
    const year = date.getFullYear() // Get full year
    // console.log(`${day}-${month}-${year}`)

    // return `Date :- ${day}-${month}-${year} `
    return `${day}-${month}-${year} `
  }

  console.log(reportReferalDoctor)
  let ita = 0,
    bta = 0
  let drname =
    reportReferalDoctor.length > 0 &&
    'Dr. ' + reportReferalDoctor[0].referDr.name

  return (
    <div className="p-10 text-center text-black">
      <span>
        Total Amount From {startDate.toLocaleDateString()} to{' '}
        {endDate.toLocaleDateString()} is{' '}
        <span className="font-bold">
          {/* ₹{saleReport?.totalSum.toFixed(2)} */}
        </span>
        {!download && (
          <span
            className="ml-3 cursor-pointer underline"
            onClick={() => setDownload(true)}
          >
            Download Excel
          </span>
        )}
        {
          <div className="overflow-x-auto">
            <table
              className="min-w-full border border-gray-200 bg-white"
              id="download_excel"
            >
              <thead>
                <tr className="border-b bg-gray-100">
                  <th
                    colSpan={5}
                    className="border-r px-4 py-2 text-left font-semibold text-gray-600"
                  >
                    Date: {startDate.toLocaleDateString()} to{' '}
                    {endDate.toLocaleDateString()}
                  </th>
                </tr>
                <tr className="border-b bg-gray-100">
                  <th
                    colSpan={5}
                    className="border-r px-4 py-2 text-left font-semibold text-gray-600"
                  >
                    {drname}
                  </th>
                </tr>
                <tr className="border-b bg-gray-100">
                  <th className="border-r px-4 py-2 text-left font-semibold text-gray-600">
                    Srl No
                  </th>
                  <th className="border-r px-4 py-2 text-left font-semibold text-gray-600">
                    Registration Date
                  </th>
                  <th className="border-r px-4 py-2 text-left font-semibold text-gray-600">
                    Patient Name
                  </th>
                  <th className="border-r px-4 py-2 text-left font-semibold text-gray-600">
                    Incentive Total
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Bill Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportReferalDoctor.map((row, index) => {
                  const calculateIncentiveTotal = row.info.investigations.map(
                    (ele) => {
                      let amt = ele.amount * (ele.perc / 100)
                      amt = parseFloat(amt.toFixed(2))
                      return { amt }
                    }
                  )

                  const incentiveTotal = calculateIncentiveTotal.reduce(
                    (prev, ele) => prev + ele.amt,
                    0
                  )

                  const billTotal = row.info.amount
                  ita += incentiveTotal
                  bta += billTotal
                  return (
                    <tr key={index} className="border-b">
                      <td className="border-r px-4 py-2">{index + 1}</td>
                      <td className="border-r px-4 py-2">
                        {newFormateDate(row.created_at)}
                      </td>
                      <td className="border-r px-4 py-2">{row.patient.name}</td>
                      <td className="border-r px-4 py-2">{incentiveTotal}</td>
                      <td className="px-4 py-2">{billTotal}</td>
                    </tr>
                  )
                })}

                <tr className="border-b">
                  <td colSpan={3} className="border-r px-4 py-2">
                    {`Total For ${drname} `}
                  </td>
                  <td className="border-r px-4 py-2">{ita}</td>
                  <td className="border-r px-4 py-2">{bta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </span>
    </div>
  )
}

export default ReportReferal
