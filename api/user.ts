import { DOMAIN_NAME } from '../utils/constants'
import axios from 'axios'

const userLogin = async ({ username, password }) => {
  const response = await axios.post(
    `${DOMAIN_NAME}/auth/login`,
    {
      username,
      password,
    },
    {
      headers: {
        mode: 'no-cors',
      },
    },
  )
  console.log(response)
}

const userSignUp = async ({
  firstName,
  lastName,
  birthDate,
  email,
  password,
  address,
  gender,
  ssin,
  role,
}) => {
  const response = await axios.post(`${DOMAIN_NAME}/auth/register`, {
    firstName,
    lastName,
    birthDate,
    email,
    password,
    address,
    gender,
    ssin,
    role,
  })
  console.log(response)
}

export { userLogin, userSignUp }
