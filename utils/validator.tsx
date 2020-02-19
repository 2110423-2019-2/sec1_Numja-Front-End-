import React from 'react'

const registrationValidator = ({ field = '', input = '', data = null }) => {
  switch (field) {
    case 'rePassword':
      if (input !== data.password)
        return {
          error: true,
          message: 'password did not match',
        }
      return {
        error: false,
        message: '',
      }
    default:
      return {
        error: false,
        message: '',
      }
  }
}

export default registrationValidator
