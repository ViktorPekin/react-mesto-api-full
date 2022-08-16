import React, {useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from '../components/Card'
import Header from './Header';
import Footer from './Footer';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header onSignOut={props.onSignOut} linkPath={'/sign-in'} linkName="Выйти" email={props.email} changeColor="true"/>
      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <button onClick={props.onEditAvatar} className="profile__button-avatar">
              <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
            </button>
            <div className="profile__info-name">
              <div className="profile__info-group">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button onClick={props.onEditProfile} type="button" className="profile__info-button"></button>
              </div>
              <p className="profile__sub-name">{currentUser.about}</p>
            </div>
          </div>
          <button onClick={props.onAddPlace} type="button" className="profile__button"></button>
        </section>
        <section className="elements">
          <ul className="elements__grid">
            {props.cards.map((card) => (
              <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}/>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Main;
