import React from 'react'
import Link from 'next/link'

const Button = ({
  href = '',
  subclass = null,
  children,
  width,
  height,
  ...otherProps
}) => (
  <Link href={href}>
    <a className={`button ${subclass}`} {...otherProps}>
      {children}

      <style jsx>{`
        .button {
          display: inline-block;
          width: ${width};
          height: ${height};
          background-color: white;
          border: 1px solid #c4c4c4;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          text-decoration: none;
        }
        .black {
          background-color: #100f0f;
          color: white;
        }
      `}</style>
    </a>
  </Link>
)

export default Button
