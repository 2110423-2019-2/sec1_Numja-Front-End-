import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Button from '@material-ui/core/Button'

import WithNav from '../components/layout/withNav'
import InputTextbox from '../components/input-textbox'
import InputRadio from '../components/input-radio'
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
      ssin: '',
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
      ssin: { error: false, message: '' },
      address: { error: false, message: '' },
      birthDate: { error: false, message: '' },
    },
  })
  const [submitting, setSubmitting] = useState(false)

  const updateData = e => {
    const clonedState = JSON.parse(JSON.stringify(formState))

    if (e.target.type === 'radio') {
      clonedState.data[e.target.name] = parseInt(e.target.value)
    } else {
      clonedState.data[e.target.name] = e.target.value
    }
    clonedState.validation[e.target.name] = registrationValidator({
      field: e.target.name,
      input: clonedState.data[e.target.name],
      data: clonedState.data,
    })
    setFormState(clonedState)
  }

  const invokeUnfilledRequired = () => {
    const clonedState = JSON.parse(JSON.stringify(formState))
    Object.keys(formState.data).forEach(key => {
      if (formState.data[key] === '') {
        formState.validation[key] = {
          error: true,
          message: 'field is required',
        }
      }
    })
    setFormState(clonedState)
  }

  const isValidated = (validation, current) => validation.error && current

  const handleSignUp = async () => {
    invokeUnfilledRequired()
    if (isValidated(formState.validation, true)) {
      await console.log(formState.data)
      Router.push('/')
    } else {
      window.scrollBy(0, 0)
      console.log('not validated')
      console.log(formState)
    }
  }

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
          value={formState.data.ssin}
          name="ssin"
          onChange={updateData}
          placeholder="Id no."
          error={formState.validation.ssin.error}
          errorMessage={formState.validation.ssin.message}
          required
        />
        <InputTextbox
          value={formState.data.address}
          name="address"
          onChange={updateData}
          placeholder="address"
          error={formState.validation.address.error}
          errorMessage={formState.validation.address.message}
          required
        />
        <InputRadio
          name="gender"
          current={formState.data.gender}
          onChange={updateData}
          choices={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputRadio
          name="type"
          current={formState.data.type}
          onChange={updateData}
          choices={[
            { label: 'Student', value: 'student' },
            { label: 'Tutor', value: 'teacher' },
          ]}
        />
        <InputTextbox
          value={formState.data.birthDate}
          name="birthDate"
          onChange={updateData}
          error={formState.validation.birthDate.error}
          errorMessage={formState.validation.birthDate.message}
          type="date"
        />
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={handleSignUp}
          disabled={submitting}
        >
          Sign Up
        </Button>
        <Link href="/login">
          <a>already have an account? login here</a>
        </Link>
      </WithNav>
    </div>
  )
}

export default SignUp
