import React from 'react'
import Link from 'next/link'

const links = [
  { href: '/', label: 'HOME' },
  { href: '/appointment', label: 'APPOINTMENT' },
  { href: '/profile', label: 'PROFILE' },
  { href: '/chat', label: 'CHAT' },
  { href: '/schedule', label: 'SCHEDULE' },
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}))

const WithSidebar = props => {
  return (
    <div className="with-sidebar-wrapper">
      <div className="sidebar">
        <ul>
          {links.map(({ href, label, key }, index) => (
            <li key={key} className={index === props.current ? 'current' : ''}>
              <Link href={href}>
                <a>
                  {index === props.current ? '>>>' : ''}
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-child">{props.children}</div>

      <style jsx>
        {`
        .with-sidebar-wrapper {
          div-sizing: border-div;
          padding: 0 60px 55px 60px;
          display: flex;
          height: 78vh;
        }
        .sidebar {
          min-width: 156px;
          position: relative;
          background: #f0f0f0;
          border-radius: 8px;
          margin-right: 60px;
          height: 100%;
          div-sizing: border-div;
          padding: 15px 10px;
        }
        .sidebar ul {
          display: flex;
          flex-direction: column;
          list-style: none;
          margin: 0;
          padding: 0;
          color: #000000;
        }
        .sidebar ul li {
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          margin-bottom: 26px;
        }
        .sidebar ul li.current {
          text-align: right;
          font-weight: bold;
        }
        .sidebar ul li a {
          text-decoration: none;
          color: black;
        }
        .sidebar-child {
            position: relative:
            height: 100%;
            width: 100%;
            background: #F0F0F0;
            border-radius: 8px;
            div-sizing: border-div;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
      `}
      </style>
    </div>
  )
}

export default WithSidebar
