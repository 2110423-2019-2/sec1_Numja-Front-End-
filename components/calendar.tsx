import React, { useState } from 'react'

import {
  format,
  addMonths,
  subMonths,
  addYears,
  subYears,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  getDate,
} from 'date-fns'

const Calendar = ({ event = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const headerDateFormat = 'MMMM yyyy'

  const daysDateFormat = 'EEEEEE'
  const dayStartDate = startOfWeek(currentMonth)
  const dayDays = []
  for (let i = 0; i < 7; i++) {
    dayDays.push(format(addDays(dayStartDate, i), daysDateFormat))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfMonth(monthEnd)
  let days = []
  let day = startDate
  let formattedDate = 0
  const rows = []
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = getDate(day)
      days.push({
        day,
        formattedDate,
      })
      day = addDays(day, 1)
    }
    rows.push(days)
    days = []
  }
  console.log(rows)

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const prevYear = () => {
    setCurrentMonth(subYears(currentMonth, 1))
  }

  const nextYear = () => {
    setCurrentMonth(addYears(currentMonth, 1))
  }

  return (
    <div className="calendar">
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevYear}>
            {'<<'}
          </div>
        </div>
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            {'<'}
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, headerDateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">{'>'}</div>
        </div>
        <div className="col col-end" onClick={nextYear}>
          <div className="icon">{'>>'}</div>
        </div>
      </div>
      <div className="days row">
        {dayDays.map((day, index) => (
          <div className="col col-center" key={index}>
            {day}
          </div>
        ))}
      </div>
      <div className="body">
        {rows.map((row, index) => (
          <div className="row" key={`calendar-body-row-${index}`}>
            {row.map(item => (
              <div
                className={`col cell ${
                  isSameMonth(item.day, monthStart) ? '' : 'disabled'
                }`}
              >
                <div className="number">{item.formattedDate}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>
        {`
          :root {
            --main-color: #1a8fff;
            --text-color: #777;
            --text-color-light: #ccc;
            --border-color: #eee;
            --bg-color: #f9f9f9;
            --neutral-color: #fff;
          }
          * {
            box-sizing: border-div;
          }

          // GRID
          .row {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }
          .row-middle {
            align-items: center;
          }
          .col {
            flex-grow: 1;
            flex-basis: 0;
            max-width: 100%;
          }
          .col-start {
            justify-content: flex-start;
            text-align: left;
          }
          .col-center {
            justify-content: center;
            text-align: center;
          }
          .col-end {
            justify-content: flex-end;
            text-align: right;
          }

          // CALENDAR
          .calendar {
            display: block;
            position: relative;
            width: 100%;
            background: white;
            border-radius: 5px;
            -webkit-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
            box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
          }

          .calendar .header {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 115%;
            padding: 1.5em 0;
            border-bottom: 1px solid #888;
          }

          .calendar .header .icon {
            cursor: pointer;
            transition: 0.15s ease-out;
          }

          .calendar .header .icon:hover {
            transform: scale(1.05);
            transition: 0.25s ease-out;
            color: var(--main-color);
          }

          .calendar .header .icon:first-of-type {
            margin-left: 1em;
          }

          .calendar .header .icon:last-of-type {
            margin-right: 1em;
          }

          .calendar .days {
            text-transform: uppercase;
            font-weight: 400;
            color: #303030;
            font-size: 70%;
            padding: 0.75em 0;
            border-bottom: 1px solid #888;
          }

          .calendar .body .cell {
            position: relative;
            height: 65px;
            border-right: 1px solid #dfdfe6;
            overflow: hidden;
            cursor: pointer;
            background: white;
            display: flex;
            justify-content: center;
          }

          .calendar .body .cell:hover {
            background: whitesmoke;
            transition: 0.25s ease-out;
          }

          .calendar .body .selected {
            border-left: 10px solid transparent;
            border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
            border-image-slice: 1;
          }

          .calendar .body .row {
            border-bottom: 1px solid #dfdfe6;
          }

          .calendar .body .row:last-child {
            border-bottom: none;
          }

          .calendar .body .cell:last-child {
            border-right: none;
          }

          .calendar .body .cell .number {
            font-size: 82.5%;
            line-height: 1;
            font-weight: 700;
            margin-top: 10px;
          }

          .calendar .body .disabled {
            background-color: #dfdfe6;
            pointer-events: none;
          }

          .calendar .body .cell .bg {
            font-weight: 700;
            line-height: 1;
            color: var(--main-color);
            opacity: 0;
            font-size: 8em;
            position: absolute;
            top: -0.2em;
            right: -0.05em;
            transition: 0.25s ease-out;
            letter-spacing: -0.07em;
          }

          .calendar .body .cell:hover .bg,
          .calendar .body .selected .bg {
            opacity: 0.05;
            transition: 0.5s ease-in;
          }
        `}
      </style>
    </div>
  )
}

export default Calendar
