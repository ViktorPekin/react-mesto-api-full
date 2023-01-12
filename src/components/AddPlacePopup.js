import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setLink('');
    setName('');
  },[props.isOpen]);

  return(
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'card-add'}
      title={'Новое место'}
      buttonText={'Создать'}
      children={
        <>
          <div className="popup__input-container">
            <input onChange={handleName} value={name} className="popup__input popup__input_cards_name" id="link-name-input" placeholder="Название" type="text" minLength="2" maxLength="30" name="name" required/>
            <span className="popup__input-error link-name-input-error"></span>
          </div>
          <div className="popup__input-container">
            <input onChange={handleLink} value={link} className="popup__input popup__input_cards_link" id="link-input" placeholder="Ссылка на картинку" type="url" name="link" required/>
            <span className="popup__input-error link-input-error"></span>
          </div>
        </>
      }
    />
  )
}

export default AddPlacePopup;
