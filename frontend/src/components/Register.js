import Header from "./Header";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegistration({
      password,
      email
    });
  }

  return(
    <>
    <Header linkPath={"/sign-in"} linkName={"Войти"}/>
    <div className="login-registration">
      <h2 className="login-registration__title">{props.title}</h2>
      <form onSubmit={handleSubmit} className="login-registration__form">
        <input className="login-registration__email" name="email" value={email}
        onChange={handleEmail} placeholder="Email">
        </input>
        <input className="login-registration__password" name="password" value={password}
        onChange={handlePassword} placeholder="Пароль">
         </input>
        <button className="login-registration__button">{props.button}</button>
        <Link className="login-registration__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
    </>
  )
}

export default Register;

