import React from 'react'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Profile = () => {
  return (
    <div className="profile">
      <WithNav>
        <WithSidebar>profile</WithSidebar>
      </WithNav>
    </div>
  )
}

export default Profile
