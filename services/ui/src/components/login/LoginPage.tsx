import * as React from 'react';
import Login from 'components/plaid/Login';
import LoginBoxContainer from 'components/login/LoginBoxContainer';

const LoginPage = () => (
    <div>
        Login Page
        <Login />
        <LoginBoxContainer />
    </div>
)

export default LoginPage;