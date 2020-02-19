import React, { useState } from 'react'

import WithNav from '../components/layout/withNav'
import InputTextbox from '../components/input-textbox'
import registrationValidator from '../utils/validator'

const SignUp = () => {
  const [formState, setFormState] = useState({
    data: {
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
    },
    validation: {
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
    },
  })

  const updateData = e => {
    // deep clone object so react rerender at setFormState
    const clonedState = JSON.parse(JSON.stringify(formState))

    clonedState.data[e.target.name] = e.target.value
    clonedState.validation[e.target.name] = registrationValidator({
      field: e.target.name,
      input: clonedState.data[e.target.name],
      data: clonedState.data,
    })
    console.log(clonedState)
    setFormState(clonedState)
  }

  console.log(formState)
  return (
    <div className="sign-up">
      <WithNav>
        <InputTextbox
          value={formState.data.username}
          name="username"
          onChange={updateData}
          placeholder="Username"
          error={formState.validation.username.error}
          errorMessage={formState.validation.username.message}
          required
        />
        <InputTextbox
          value={formState.data.password}
          name="password"
          onChange={updateData}
          placeholder="Password"
          error={formState.validation.password.error}
          errorMessage={formState.validation.password.message}
          usingPassword
          required
        />
        <InputTextbox
          value={formState.data.rePassword}
          name="rePassword"
          onChange={updateData}
          placeholder="Re-Password"
          error={formState.validation.rePassword.error}
          errorMessage={formState.validation.rePassword.message}
          usingPassword
          required
        />
        <InputTextbox
          value={formState.data.firstName}
          name="firstName"
          onChange={updateData}
          placeholder="First Name"
          error={formState.validation.firstName.error}
          errorMessage={formState.validation.firstName.message}
          required
        />
        <InputTextbox
          value={formState.data.lastName}
          name="lastName"
          onChange={updateData}
          placeholder="Last Name"
          error={formState.validation.lastName.error}
          errorMessage={formState.validation.lastName.message}
          required
        />
        <InputTextbox
          value={formState.data.email}
          name="email"
          onChange={updateData}
          placeholder="E-mail"
          error={formState.validation.email.error}
          errorMessage={formState.validation.email.message}
          required
        />
        <InputTextbox
          value={formState.data.ssn}
          name="ssn"
          onChange={updateData}
          placeholder="Id no."
          error={formState.validation.ssn.error}
          errorMessage={formState.validation.ssn.message}
          required
        />
        <InputTextbox
          value={formState.data.birthDate}
          name="birthDate"
          onChange={updateData}
          error={formState.validation.birthDate.error}
          errorMessage={formState.validation.birthDate.message}
          type="date"
        />
      </WithNav>
    </div>
  )
}

export default SignUp
