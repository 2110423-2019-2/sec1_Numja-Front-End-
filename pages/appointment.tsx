import React, { useState } from 'react'

import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'
import Calendar from '../components/calendar'

const Appointment = () => {
  return (
    <div className="appointment">
      <WithNav>
        <WithSidebar current={1}>
          <Calendar />
        </WithSidebar>
      </WithNav>
    </div>
  )
}

export default Appointment
