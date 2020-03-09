import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import WithLink from './withLink'

const links = [
  { href: '/help', label: 'Help', type: 'item' },
  { href: '/about-us', label: 'About Us', type: 'item' },
  { href: '/sign-up', label: 'Sign Up', type: 'button', variant: 'contained' },
  { href: '/login', label: 'Log In', type: 'button' },
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}))

const WithNav = props => (
  <>
    <nav>
      <div className="nav-left">
        <Link href="/">
          <a className="nav-logo">Indemand</a>
        </Link>
      </div>
      <div className="nav-right">
        <ul>
          {links.map(({ href, key, label, type, variant }) => (
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
    </nav>
    <div className="below-nav">{props.children}</div>

    <style jsx>{`
      nav {
        box-sizing: border-div;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 9px 25px;
        background-color: #f2f2f2;
        margin-bottom: 45px;
      }
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
        color: #000000;
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
        color: black;
      }
      .nav-right-button {
        display: inline-block;
        width: 100px;
        height: 40px;
        background-color: white;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
      }
    `}</style>
  </>
)

export default WithNav
