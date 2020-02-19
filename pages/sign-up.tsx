import React, { useState } from 'react'

import WithNav from '../components/layout/withNav'
import InputTextbox from '../components/input-textbox'
import registrationValidator from '../utils/validator'

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    rePassword: '',
    type: 0,
    gender: 0,
    firstName: '',
    lastName: '',
    email: '',
    ssn: '',
    address: '',
    birthDate: new Date().toDateString(),
  })
  const [validation, setValidation] = useState({
    username: { error: false, message: '' },
    password: { error: false, message: '' },
    rePassword: { error: false, message: '' },
    type: { error: false, message: '' },
    gender: { error: false, message: '' },
    firstName: { error: false, message: '' },
    lastName: { error: false, message: '' },
    email: { error: false, message: '' },
    ssn: { error: false, message: '' },
    address: { error: false, message: '' },
    birthDate: { error: false, message: '' },
  })

  // TODO : use cloned state to reduce render
  //        (this is quick implementation)
  const updateData = e => {
    console.log(e.target.value)
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    // setValidation({
    //   ...validation,
    //   [e.target.name]: registrationValidator({
    //     field: e.target.name,
    //     input: data[e.target.name],
    //     data: data,
    //   }),
    // })
  }

  return (
    <div className="sign-up">
      <WithNav>
        <InputTextbox
          value={data.username}
          name="username"
          onChange={updateData}
          placeholder="Username"
          error={validation.username.error}
          errorMessage={validation.username.message}
          required
        />
        <InputTextbox
          value={data.password}
          name="password"
          onChange={updateData}
          placeholder="Password"
          error={validation.password.error}
          errorMessage={validation.password.message}
          usingPassword
          required
        />
        <InputTextbox
          value={data.rePassword}
          name="rePassword"
          onChange={updateData}
          placeholder="Re-Password"
          error={validation.rePassword.error}
          errorMessage={validation.rePassword.message}
          usingPassword
          required
        />
        <InputTextbox
          value={data.firstName}
          name="firstName"
          onChange={updateData}
          placeholder="First Name"
          error={validation.firstName.error}
          errorMessage={validation.firstName.message}
          required
        />
        <InputTextbox
          value={data.lastName}
          name="lastName"
          onChange={updateData}
          placeholder="Last Name"
          error={validation.lastName.error}
          errorMessage={validation.lastName.message}
          required
        />
        <InputTextbox
          value={data.email}
          name="email"
          onChange={updateData}
          placeholder="E-mail"
          error={validation.email.error}
          errorMessage={validation.email.message}
          required
        />
        <InputTextbox
          value={data.ssn}
          name="ssn"
          onChange={updateData}
          placeholder="Id no."
          error={validation.ssn.error}
          errorMessage={validation.ssn.message}
          required
        />
        <InputTextbox
          value={data.birthDate}
          name="birthDate"
          onChange={updateData}
          error={validation.birthDate.error}
          errorMessage={validation.birthDate.message}
          type="date"
        />
      </WithNav>
    </div>
  )
}

export default SignUp
