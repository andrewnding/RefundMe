import * as React from 'react'
import { ISignUpBox } from 'components/sign-up/SignUpBoxContainer'

const SignUpBox = ({ personCreate }: ISignUpBox) => {
  const [emailField, setEmailField] = React.useState('');
  const [passwordField, setPasswordField] = React.useState('');
  const [firstNameField, setFirstNameField] = React.useState('');
  const [lastNameField, setLastNameField] = React.useState('');

  const handleChangeEmailField = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailField(e.target.value)
  }

  const handleChangePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordField(e.target.value)
  }

  const handleChangeFirstNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameField(e.target.value)
}

const handleChangeLastNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLastNameField(e.target.value)
}

  const onSubmitLogin = async (e: React.MouseEvent) => {
      e.preventDefault()
      console.log('submit sign up')
      personCreate({
        email: emailField,
        password: passwordField,
        firstName: firstNameField,
        lastName: lastNameField,
      })
  }

  return (
      <div className="container">
          <form>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email Address</label>
                  <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={emailField}
                      onChange={handleChangeEmailField}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={passwordField}
                      onChange={handleChangePasswordField}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputFirstName">First Name</label>
                  <input
                      type="text"
                      className="form-control"
                      id="exampleInputFirstName"
                      value={firstNameField}
                      onChange={handleChangeFirstNameField}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputLastName">Last Name</label>
                  <input
                      type="text"
                      className="form-control"
                      id="exampleInputLastName"
                      value={lastNameField}
                      onChange={handleChangeLastNameField}
                  />
              </div>
              <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onSubmitLogin}
              >
                  Submit
              </button>
          </form>
      </div>   
  )
}

export default SignUpBox;