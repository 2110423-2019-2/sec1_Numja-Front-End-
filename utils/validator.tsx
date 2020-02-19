const registrationValidator = ({ field = '', input = '', data = null }) => {
  switch (field) {
    case 'password':
      if (input.length < 8) {
        return {
          error: true,
          message: 'password must have atleast 8 characters',
        }
      }
      break

    case 'rePassword':
      if (input !== data.password) {
        return {
          error: true,
          message: 'password did not match',
        }
      }
      break

    case 'email':
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailRegex.test(input)) {
        return {
          error: true,
          message: 'please use email with standard format',
        }
      }

    default:
      return {
        error: false,
        message: '',
      }
  }
  return {
    error: false,
    message: '',
  }
}

export default registrationValidator
