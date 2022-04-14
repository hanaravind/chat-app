import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import SignInImage from '../assets/signup.jpg'

const cookies = new Cookies()

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarUrl: ''
}

const Auth = () => {

    const [form, setForm] = useState(initialState)

    const [isSignUp, setSignUp] = useState(true);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const switchMode = () => {
        setSignUp((prevSignUp) => !prevSignUp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { fullName, username, password, phoneNumber, avatarURL } = form

        const URL = 'https://chat-app-han.herokuapp.com/auth'

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, { 
            username, phoneNumber, fullName: form.fullName, password, avatarURL
        })

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('userId', userId)
        cookies.set('fullName', fullName)

        if(isSignUp) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }

        window.location.reload()
    }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type={"text"}
                  placeholder={"Fullname"}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">UserName</label>
              <input
                name="username"
                type={"text"}
                placeholder={"username"}
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type={"text"}
                  placeholder={"Phone Number"}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type={"text"}
                  placeholder={"Avatar URL"}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="avatarURL">Password</label>
              <input
                name="password"
                type={"password"}
                placeholder={"Password"}
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type={"password"}
                  placeholder={"ConfirmPassword"}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
                <button>{isSignUp ? 'Sign Up': 'Sign In'}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignUp ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
          <img src={SignInImage} alt="Sign In" />
      </div>
    </div>
  );
};

export default Auth;
