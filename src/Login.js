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
      {/* <div className='right'>
        <img src={logo} className='logo'/>
      </div> */}
    </div>
  );
};

export default Login;
