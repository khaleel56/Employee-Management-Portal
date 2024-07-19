import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'

const Login = () => {
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const req = {
      email: loginState.email,
      password: loginState.password
    }
    console.log(loginState)

    axios
      .post(
        "http://localhost:4000/app/auth/login",
        req,
        {
          headers: {
            "Content-Type": 'application/json',
          },
        }
      )
      .then((response) => {
        console.log("Server response:", response.data);
        localStorage.setItem('token', response.data.token);

        navigate('/home');
      })
      .catch((err) => {
        console.log("Error uploading user data:", err);
      });
  }

  return (<div>
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label>email : </label>
        <input
          id='email'
          type="text"
          name='email'
          value={loginState.email}
          onChange={handleChange} />
      </div>
      <div>    
        <label>password : </label>
        <input
          id='password'
          type="password"
          name='password'
          value={loginState.password}
          onChange={handleChange} /></div>
      <button>login</button>
    </form>
  </div>
  )
}

export default Login;
