import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
export default function NewCard(props) {
  const [card, setCard] = useState();

  //const [link, setLink] = useState(currentUser.link);
  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlaceSubmit(card);
  }
  function handleNameChange(event) {
    setCard({ ...card, name: event.target.value });
  }
  function handleLinkChange(event) {
    setCard({ ...card, link: event.target.value });
  }
  return (
    <form className="popup__form popup__add-profile" id="form-cards">
      <input
        type="text"
        name="name"
        placeholder="title"
        id="input-card-title"
        className="popup__item"
        minLength="2"
        maxLength="40"
        required
        value={card?.name || ""}
        onChange={(event) => handleNameChange(event)}
      />
      <span className="popup__input-error input-card-title-error"></span>

      <input
        type="url"
        name="link"
        placeholder="cargar imagen"
        id="input-card-link"
        className="popup__item"
        required
        value={card?.link || ""}
        onChange={(event) => handleLinkChange(event)}
      />
      <span className="popup__input-error input-card-link-error"></span>
      <button className="popup__submit" onClick={handleSubmit}>
        crear
      </button>
    </form>
  );
}
