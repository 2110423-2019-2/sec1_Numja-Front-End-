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

Schedule.getInitialProps = async function() {
  // ***TODO : fetch to get user profile

  // status : pending, rejected, approved, cancelled, finished
  const data = [
    {
      startTime: '2020-02-26T23:38:35.169Z',
      endTime: '2020-02-27T01:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'pending',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'finished',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'finished',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'finished',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'calcelled',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'pending',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'approved',
    },
    {
      startTime: '2020-02-05T11:38:35.169Z',
      endTime: '2020-02-05T13:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'rejected',
    },
    {
      startTime: '2020-02-10T08:38:35.169Z',
      endTime: '2020-02-10T10:38:35.169Z',
      location: 'loc',
      price: 0,
      tutorId: 'id',
      status: 'cancel',
    },
  ]

  return {
    appointments: data,
  }
}

export default Schedule
