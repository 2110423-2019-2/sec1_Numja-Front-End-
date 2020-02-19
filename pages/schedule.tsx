import React from 'react'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Schedule = () => {
  return (
    <div className="schedule">
      <WithNav>
        <WithSidebar current={4}>schedule</WithSidebar>
      </WithNav>
    </div>
  )
}

export default Schedule
