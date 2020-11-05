import React from 'react';
import LoginForm from './LoginForm';
import './login.css';

const LoginComponent = () => {
  return (
    <div className="login">
      <div className="login__title">이슈 트래커</div>
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginComponent;
