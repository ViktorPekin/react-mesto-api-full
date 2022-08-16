import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';


function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__link-container">
        {props.email ? <p className='header__name'>{props.email}</p> : ''}
        <Link onClick={props.onSignOut} className={props.changeColor ? 'header__link_change_color' : "header__link"} to={props.linkPath}>{props.linkName}</Link>
      </div>
    </header>
  )
}

export default Header;
