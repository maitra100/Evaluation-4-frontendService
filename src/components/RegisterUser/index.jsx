import React from 'react';
import './registeruser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function registerUser() {
    axios
      .post('http://localhost:8080/user', { userEmail: email, password: password })
      .then(res => {
        if (res.data === 'User added successfully') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div id="loginRight">
      <div id="loginText">
        <strong>Register to your CMS+ account</strong>
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
        <button id="submit" type="submit" onClick={registerUser}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default RegisterUser;
