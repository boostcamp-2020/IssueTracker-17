import React from 'react';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

function Auth(props) {
  const query = props.location.search.split('=');
  if (query[0] !== '?token') {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  try {
    const user = jwt.verify(query[1], JWT_SECRET);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', query[1]);
    return <Redirect to={{ pathname: '/newIssue' }}></Redirect>;
  } catch (error) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
}

export default Auth;
