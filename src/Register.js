import React, { useState } from 'react'
import reg from "./assets/register-logo.png"
import logo from "./assets/pharmacy-logo-small.png"
import "./style/Register.css"
import Input from './components/Input'
import Button from './components/Button'
import Contact from './components/Contact'
import { useNavigate } from 'react-router-dom';
import { database } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const loginClick = () =>{
    history('/login')
  }
  const handleSubmit = () => {
    createUserWithEmailAndPassword(database, email, password, fullName, username, confirmPassword).then(data => {
      console.log(data, 'authData')
      history('/login')
    })
  };
  return (
    <div className='register'>
      
      <img src={logo} className='logo1'/>

      <div className='register-inputs'>
        <h2>Эмийн сангийн системийн бүртгэл</h2>
        <div className='inputs'>
        <Input inputName="Овог, Нэр"/>
        <Input inputName="Username"/>
        <Input inputName="E-mail хаяг" inputfunctionName={handleEmailChange}/>
        <Input inputName="Нууц үг" inputfunctionName={handlePasswordChange}/>
        <Input inputName="Нууц үг давтах" />

        </div>
        <Button name="Бүртгүүлэх" functionName={handleSubmit}/>
        <div className='other'>
            <p>Бүртгэл үүсгэсэн!<button className='simple-button' onClick={loginClick}>Нэвтрэх</button></p>
            <Contact/>
        </div>
      </div>
      <img src={reg} className='register-logo'/>
    </div>
  )
}

export default Register
