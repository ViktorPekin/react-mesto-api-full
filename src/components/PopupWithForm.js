function PopupWithForm(props) {

  return(
    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup-${props.name}__container`}>
        <button onClick={props.onClose} type="button" className="popup__close"></button>
        <h2 className={`popup-${props.name}__title`}>{props.title}</h2>
        <form onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`} name={`popup-${props.name}`}>
          {props.children}
          <button className="popup__button popup__button_valid" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;
