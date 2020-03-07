import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Button from '@material-ui/core/Button'

import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'
import InputTextbox from '../components/input-textbox'
import registrationValidator from '../utils/validator'
import InputDate from '../components/input-date'

const Profile = props => {
  const [formState, setFormState] = useState(props.formData)
  const [editMode, setEditMode] = useState(false)

  const updateData = e => {
    const clonedState = JSON.parse(JSON.stringify(formState))

    clonedState.data[e.target.name] = e.target.value

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

  const handlePatch = () => {
    console.log(formState)
    setEditMode(false)
  }

  return (
    <div className="profile">
      <WithSidebar current={2}>
        {editMode && (
          <>
            <InputTextbox
              value={formState.data.username}
              name="username"
              onChange={updateData}
              placeholder="Username"
              error={formState.validation.username.error}
              errorMessage={formState.validation.username.message}
              disabled
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
              disabled
            />
            <InputTextbox
              value={formState.data.address}
              name="address"
              onChange={updateData}
              placeholder="address"
              error={formState.validation.address.error}
              errorMessage={formState.validation.address.message}
              disabled
            />
            <InputDate
              value={formState.data.birthDate}
              name="birthDate"
              onChange={updateData}
            />
            <Button
              size="medium"
              onClick={() => {
                window.location.reload()
              }}
            >
              Cancel
            </Button>
            <Button size="medium" variant="contained" onClick={handlePatch}>
              Save Change
            </Button>
          </>
        )}
        {!editMode && (
          <>
            <a
              onClick={e => {
                e.preventDefault()
                setEditMode(true)
              }}
            >
              edit
            </a>
            <p>** labelds here **</p>
          </>
        )}
      </WithSidebar>
    </div>
  )
}

Profile.getInitialProps = async function() {
  const data = {
    username: 'dummy_user_0',
    firstName: 'dummyFn',
    lastName: 'dummyLn',
    email: 'dummyuser@dummy.com',
    birthDate: '2020-03-03',
    gender: 0,
    address: 'dummy street, Dummy, Dummy',
  }

  const validation = {}
  Object.keys(data).forEach(key => {
    validation[key] = { error: false, message: '' }
  })

  return {
    formData: {
      data,
      validation,
    },
  }
}

export default Profile
