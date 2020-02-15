import * as React from 'react';
import { ILoginBox } from 'components/login/LoginBoxContainer'
import { useHistory } from 'react-router-dom'

const LoginBox = ({ loggedIn, personLogin }: ILoginBox) => {
    const [emailField, setEmailField] = React.useState('');
    const [passwordField, setPasswordField] = React.useState('');
    const history = useHistory()

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
        await personLogin({ email: emailField, password: passwordField })
        history.push('/dashboard')
      } catch (e) {
        console.log('Login Failed')
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