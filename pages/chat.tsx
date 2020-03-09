import React from 'react'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Chat = () => {
  return (
    <div className="chat">
      <WithSidebar current={3}>chat</WithSidebar>
    </div>
  )
}

export default Chat
