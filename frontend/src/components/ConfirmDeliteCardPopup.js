import PopupWithForm from "./PopupWithForm";

function ConfirmDeliteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }
  return(
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={'delete-card'}
      title={'Вы уверены'}
      buttonText={'Да'}
    />
  )
}

export default ConfirmDeliteCardPopup;
