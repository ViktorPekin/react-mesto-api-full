import { useState } from 'react';
import React from 'react';
import Header from './Header';

function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    setPassword('');
    setEmail('');
  }, []);

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({
      password,
      email
    });
  }

  return(
    <>
    <Header linkPath={"/sign-up"} linkName={"Регистрация"}/>
    <div className="login-registration">
      <h2 className="login-registration__title">{props.title}</h2>
      <form onSubmit={handleSubmit} className="login-registration__form">
        <input className="login-registration__email" name="email" value={email}
        onChange={handleEmail} placeholder="Email"></input>
        <input className="login-registration__password" name="password" value={password}
        onChange={handlePassword} placeholder="Пароль"></input>
        <button className="login-registration__button">{props.button}</button>
      </form>
    </div>
    </>
  )
}

export default Login;

