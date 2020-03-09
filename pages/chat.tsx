import React from 'react'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Chat = () => {
  return (
    <div className="chat">
      <WithNav>
        <WithSidebar current={3}>chat</WithSidebar>
      </WithNav>
    </div>
  )
}

export default Chat
