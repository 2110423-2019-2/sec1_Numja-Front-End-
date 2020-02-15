import React from 'react'
import Link from 'next/link'

import Button from '../button'

const links = [
  { href: '/help', label: 'Help', type: 'item' },
  { href: '/about-us', label: 'About Us', type: 'item' },
  { href: '/sign-up', label: 'Sign Up', type: 'button', subclass: 'black' },
  { href: '/log-in', label: 'Log In', type: 'button' },
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
          {links.map(({ href, key, label, type, subclass }) => (
            <li key={key}>
              <Link href={href}>
                {type === 'item' ? (
                  <a className="nav-right-item">{label}</a>
                ) : (
                  <Button subclass={subclass} width="100px" height="40px">
                    {label}
                  </Button>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
    <div className="below-nav">{props.children}</div>

    <style jsx>{`
      nav {
        box-sizing: border-box;
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
        font-family: Lobster;
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
        font-family: Montserrat;
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
      .button-black {
        background-color: #100f0f;
        color: white;
      }
    `}</style>
  </>
)

export default WithNav
