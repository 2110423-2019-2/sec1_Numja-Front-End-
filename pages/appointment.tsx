import React, { useState } from 'react'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Appointment = () => {
  return (
    <div className="appointment">
      <WithNav>
        <WithSidebar>appointment</WithSidebar>
      </WithNav>
    </div>
  )
}

export default Appointment
