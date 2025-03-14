import { useState, useContext, useRef } from "react";
import currentUserContext from "../../../contexts/CurrentUserContext.js";

export default function EditAvatar(props) {
  const currentUser = useContext(currentUserContext);
  const avatarRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdateAvatar({ avatar: avatarRef.current.value });
  };
  return (
    <form className="popup__form popup__avatar-edit" id="form-avatar-edit">
      <input
        type="url"
        name="avatar"
        placeholder="cargar imagen"
        id="input-avatar-link"
        className="popup__item"
        required
        defaultValue={currentUser.avatar}
        ref={avatarRef}
      />
      <span className="popup__input-error input-avatar-link-error"></span>
      <button className="popup__submit" onClick={handleSubmit}>
        Guardar
      </button>
    </form>
  );
}
