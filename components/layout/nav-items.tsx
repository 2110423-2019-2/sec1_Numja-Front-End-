import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import WithLink from './withLink'
import Toolbar from '@material-ui/core/Toolbar'

const NavItems = ({ items = [] }) => (
  <Toolbar style={{ justifyContent: 'space-between' }}>
    <Link href="/">
      <a className="nav-logo">Indemand</a>
    </Link>
    <div className="nav-right">
      <ul>
        {items.map(({ href, key, label, type, variant }) => (
          <li key={key}>
            {type === 'item' ? (
              <Link href={href}>
                <a className="nav-right-item">{label}</a>
              </Link>
            ) : (
              <WithLink href={href}>
                <Button
                  variant={variant === 'contained' ? 'contained' : 'outlined'}
                  disableElevation
                >
                  {label}
                </Button>
              </WithLink>
            )}
          </li>
        ))}
      </ul>
    </div>
    <style jsx>{`
      ul {
        list-style: none;
      }
      a {
        text-decoration: none;
      }
      .nav-logo {
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 45px;
        display: flex;
        align-items: center;
        color: white;
      }
      .nav-right ul {
        display: flex;
        align-items: center;
      }
      .nav-right ul > * {
        margin-left: 25px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
      }
      .nav-right-item {
        color: white;
      }
    `}</style>
  </Toolbar>
)

export default NavItems
