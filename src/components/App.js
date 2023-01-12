import {useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Main from './Main';
import Login from './Login';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeliteCardPopup from './ConfirmDeliteCardPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import {api} from '../utils/api';
import {auth} from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupOpen , setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeliteCardPopup, setConfirmDeliteCardPopup] = useState(false);
  const [isInfoTooltipPopup, setisInfoTooltipPopup] = useState(false);
  const [isInfoTooltiCondition, setIsInfoTooltiCondition] = useState(true);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [actualDeleteCard, setActualDeleteCard] = useState({});
  const [loggedIn, setloggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const [jwt, setJwt] = useState('');
  const navigate = useNavigate();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen ||
  isAddPlacePopupOpen || isConfirmDeliteCardPopup || isInfoTooltipPopup || selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    function closeOnOverlay(evt) {
      if(evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mousedown', closeOnOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.addEventListener('mousedown', closeOnOverlay);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, jwt).then((newCard) => {
      setCards(cards.map((c) => c._id === card._id ? newCard.card : c));
    }).catch((err) => {
      console.log(err);
    });
  }

  function openConfirmPopup() {
    api.deleteCard(actualDeleteCard._id, jwt).then(() => {
      setCards(cards.filter((c) => c._id !== actualDeleteCard._id));
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    setActualDeleteCard(card);
    setConfirmDeliteCardPopup(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmDeliteCardPopup(false);
    setSelectedCard({});
    setisInfoTooltipPopup(false);
  }

  function handleUpdateUser(value) {
    api.patchProfile(value, jwt).then((res) => {
      setCurrentUser(res.user);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(value) {
    api.patchAvatar(value.avatar, jwt).then((res) => {
      setCurrentUser(res.user);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(value) {
    api.addNewCard(value, jwt).then((res) => {
      setCards([res.card, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleRegistrationUser(value) {
    auth.registrationUser(value).then((res) => {
      if (res) {
        navigate('/sign-in');
        setIsInfoTooltiCondition(true);
      } else {
        setIsInfoTooltiCondition(false);
      }
    }).catch((err) => {
      console.log(err);
      setIsInfoTooltiCondition(false);
    }).finally(() => {
      setisInfoTooltipPopup(true);
    });
  }

  function handleLoginUser(value) {
    auth.authUser(value).then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        handleTokenCheck();
        setloggedIn(true);
        navigate('/');
      }
    }).catch((err) => {
      console.log(err);
      setIsInfoTooltiCondition(false);
      setisInfoTooltipPopup(true);
    });
  }

  function handleTokenCheck(){
    if (localStorage.getItem('token')){
      const jwtToken = localStorage.getItem('token');
      auth.checkedToken(jwtToken).then((res) => {
        setJwt(jwtToken);
        setloggedIn(true);
        navigate('/');
        setCurrentUser(res.user);
        setEmailUser(res.user.email);
        getCards(jwtToken);
      }).catch((err) => {
      console.log(err);
      });
    }
  }

  function getCards(jwtToken) {
    api.getInitialCard(jwtToken).then((res) => {
      setCards(res.card);
    }).catch((err) => {
      console.log(err);
    });
  }

  function signOut(){
    localStorage.removeItem('token');
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
              >
                <Main
                loggedIn={loggedIn}
                cards={cards}
                email={emailUser}
                onSignOut={signOut}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onCardClick={setSelectedCard}/>
              </ProtectedRoute>
            }/>
            <Route path="/sign-in" element={
              <Login title={'Вход'} button={'Войти'} onLogin={handleLoginUser}/>
            }/>
            <Route path="/sign-up" element={
              <Register title={'Регистрация'} button={'Зарегистрироваться'} onRegistration={handleRegistrationUser}/>
            }/>
            <Route path="*" element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }/>
          </Routes>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <ConfirmDeliteCardPopup onCardDelete={openConfirmPopup} isOpen={isConfirmDeliteCardPopup} onClose={closeAllPopups}/>
          <InfoTooltip onCondition={isInfoTooltiCondition} isOpen={isInfoTooltipPopup} onClose={closeAllPopups}/>
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
