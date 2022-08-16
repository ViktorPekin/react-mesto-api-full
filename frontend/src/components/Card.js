import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function toggleLike() {
    props.onCardLike(props.card);
  }

  function deleteCard() {
    props.onCardDelete(props.card);
  }

  return(
    <li className="element">
      <img onClick={handleCardClick} src={props.card.link} alt={props.card.name} className="element__image"/>
      <div className="element__bottom">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like-container">
          <button onClick={toggleLike} type="button" className={`element__like ${isLiked && 'element__like_active'}`}></button>
          <p className="element__like-amount">{props.card.likes.length}</p>
        </div>
      </div>
      <button onClick={deleteCard} type="button" className={`element__delete ${!isOwn && 'element__delete_hidden'}`}></button>
    </li>
  )
}

export default Card;
