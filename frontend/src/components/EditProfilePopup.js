import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React, {useEffect, useState, useContext} from 'react';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

 return (
  <PopupWithForm
    onSubmit={handleSubmit}
    isOpen={props.isOpen}
    onClose={props.onClose}
    name={'edit-profile'}
    title={'Редактировать профиль'}
    buttonText={'Сохранить'}
    children={
      <>
        <div className="popup__input-container">
          <input onChange={handleName} value={name || ''} className="popup__input popup__input_content_name" id="name-input" type="text" placeholder="Имя"
          minLength="2" maxLength="40" name="name"  required/>
          <span className="popup__input-error name-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input onChange={handleDescription} value={description || ''} className="popup__input popup__input_content_sub-name" id="sub-name-input" type="text"
          placeholder="Профессиональная деятельность" minLength="2" maxLength="200" name="subName" required/>
          <span className="popup__input-error sub-name-input-error"></span>
        </div>
      </>
    }
  />
 )
}

export default EditProfilePopup;
