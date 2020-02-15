import React from 'react'

const Button = props => (
  <a className={`button ${props.subclass}`}>
    {props.children}

    <style jsx>{`
      .button {
        display: inline-block;
        width: ${props.width};
        height: ${props.height};
        background-color: white;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
      }
      .black {
        background-color: #100f0f;
        color: white;
      }
    `}</style>
  </a>
)

export default Button
