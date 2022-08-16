import PopupWithForm from './PopupWithForm';
import {useRef, useEffect} from 'react';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  },[props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      children={
          <div className="popup__input-container">
            <input ref={avatarRef} className="popup__input" id="avatar-input" type="url"
            placeholder="Введите ссылку" minLength="2" maxLength="200" name="link" required/>
            <span className="popup__input-error avatar-input-error"></span>
          </div>
      }
    />
  )
}

export default EditAvatarPopup;
