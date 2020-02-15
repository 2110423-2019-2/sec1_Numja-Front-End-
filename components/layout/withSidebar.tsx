import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

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
  const { pathname } = Router
  return (
    <div className="with-sidebar-wrapper">
      <div className="sidebar">
        <ul>
          {links.map(({ href, label, key }) => (
            <li key={key} className={href === pathname ? 'current' : ''}>
              <Link href={href}>
                <a>
                  {href === pathname ? '>>>' : ''}
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
          box-sizing: border-box;
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
          box-sizing: border-box;
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
          font-family: Montserrat;
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
            padding: 30px;
            background: #F0F0F0;
            border-radius: 8px;
            box-sizing: border-box;
        }
      `}
      </style>
    </div>
  )
}

export default WithSidebar
