import * as React from 'react';
import Login from '../plaid/Login';
import LoginBoxContainer from './LoginBoxContainer';

const LoginPage = () => (
    <div>
        Login Page
        <Login />
        <LoginBoxContainer />
    </div>
)

export default LoginPage;