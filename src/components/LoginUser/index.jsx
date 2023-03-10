import React from 'react';
import './loginuser.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function changeEmail(e) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function validateUser() {
    axios
      .post('http://localhost:8080/login', { userEmail: email, password: password })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          console.log(res.data.token);
          navigate('/dashboard');
        }
      })
      .catch(err => console.log(err));
    setEmail('');
    setPassword('');
  }

  return (
    <div id="loginRight">
      <div id="loginText">
        <strong>Login to your CMS+ account</strong>
      </div>
      <div className="loginUser">
        <label className="inputLabel" htmlFor="email">
          Email
        </label>
        <input className="detailInput" type="text" onChange={changeEmail} value={email} />
        <label className="inputLabel" htmlFor="password">
          Password
        </label>
        <input className="detailInput" type="password" onChange={changePassword} value={password} />
      </div>
      <div id="submitButton">
        <button id="submit" type="submit" onClick={validateUser}>
          Login
        </button>
      </div>
      <div id="forgot">
        <a>Forgot password</a>
      </div>
      <div id="forgot">
        <a onClick={() => navigate('/register')}>Register instead</a>
      </div>
    </div>
  );
}

export default LoginUser;
