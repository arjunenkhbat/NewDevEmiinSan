/**
 * @author Arjun
 * @file Login.js
 * @description This file contains a React functional component for user login functionality.
 * 
 * @requires React - For creating the component and managing state.
 * @requires Firebase - For authentication using Firebase.
 * @requires React-Router-Dom - For navigation between different routes.
 * 
 * @component
 * The Login component provides a user interface for logging into the application. It includes input fields for the
 * email and password, and a submit button to authenticate the user using Firebase Authentication. Upon successful
 * login, the user is redirected to the homepage. There is also an option to navigate to the registration page for new users.
 * 
 * @function Login - The main React functional component.
 * @property {object} state - The component's state includes:
 * - `email`: Stores the email input by the user.
 * - `password`: Stores the password input by the user.
 * 
 * @method handleEmailChange - Updates the state with the user's email input.
 * @method handlePasswordChange - Updates the state with the user's password input.
 * @method registerClick - Redirects the user to the registration page.
 * @method handleSubmit - Authenticates the user with Firebase using the provided email and password.
 * 
 * @returns {JSX.Element} The JSX code for rendering the login form.
 * 
 * @example
 * <Login />
 * 
 * @see {@link https://reactjs.org/|React}
 * @see {@link https://firebase.google.com/|Firebase}
 * @see {@link https://reactrouter.com/|React Router}
 */
import React, { useState } from 'react';
import logo from "./assets/pharmacy-logo.png"
import "./style/Login.css"
import charm from "./assets/charm1.png"
import Input from './components/Input';
import Button from './components/Button';
import Contact from './components/Contact';
import { useNavigate } from 'react-router-dom';
import { database } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from './AuthContext';

const Login = () => {
  const { isLogin, setLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const registerClick = () =>{
    history('/register')
  }
  const handleSubmit = async () => {
    try {
      const data = await signInWithEmailAndPassword(database, email, password);
      console.log(data, 'authData');
      setLogin(true);
      history('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='main'>
      <img src={logo} className='logo'/>
      <div className='left'>
        <h2>Нэвтрэх</h2>
        <div className='inputs'>
          <Input inputName="Нэвтрэх нэр" inputfunctionName={handleEmailChange}/>
          <Input inputName="Нууц үг" inputfunctionName={handlePasswordChange} type="password"/>
        </div>
        <Button name="Нэвтрэх" functionName={handleSubmit} disable={false}/>
        <div className='other'>
          <p>Шинээр бүртгэл үүсгэх үү?<button className='simple-button' onClick={registerClick}>Бүртгүүлэх</button></p>
          <Contact/>
        </div>
      </div>
    </div>
  );
};

export default Login;
