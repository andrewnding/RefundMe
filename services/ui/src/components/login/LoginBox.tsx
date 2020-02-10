import * as React from 'react';
import axios, { AxiosResponse } from 'axios'
import { ILoginBox } from 'components/login/LoginBoxContainer'

const LoginBox = ({ loggedIn, personLogin }: ILoginBox) => {
    const [emailField, setEmailField] = React.useState('');
    const [passwordField, setPasswordField] = React.useState('');

    const handleChangeEmailField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailField(e.target.value)
    }

    const handleChangePasswordField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordField(e.target.value)
    }

    const onSubmitLogin = async (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('submit login')
        try {
          const res: AxiosResponse = await axios.post('/api/login', {
            email: emailField,
            password: passwordField,
          });

          personLogin({
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            loggedIn: true,
          })

        } catch (e) {
          console.log('error logging in ', e)
        }
    }

    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
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

export default LoginBox;