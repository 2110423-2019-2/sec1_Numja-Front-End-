import { DOMAIN_NAME } from '../utils/constants'
import { postData } from './index'

const userLogin = async (username, password) => {
  const response = await fetch(`${DOMAIN_NAME}/auth/login`)
}

export { userLogin }
