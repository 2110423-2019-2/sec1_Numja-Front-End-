import { DOMAIN_NAME } from '../utils/constants'
import axios from 'axios'

const userLogin = async (username, password) => {
  const response = await axios.get(`${DOMAIN_NAME}/auth/login`)
}

export { userLogin }
