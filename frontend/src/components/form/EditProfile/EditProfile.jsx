import { useState, useContext } from "react";
import currentUserContext from "../../../contexts/CurrentUserContext.js";
export default function EditProfile(props) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    props.handleUpdateUser({ name, about: description }); // Actualiza la información del usuario
  };

  return (
    <form className="" id="form-profile">
      <input
        type="text"
        placeholder="nombre"
        id="input-name"
        className="popup__item"
        minLength="2"
        maxLength="40"
        required
        name="name"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error input-name-error"></span>

      <input
        type="text"
        placeholder="descripción"
        id="input-about"
        className="popup__item"
        minLength="2"
        maxLength="200"
        required
        name="about"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error input-about-error"></span>
      <button className="popup__submit" onClick={handleSubmit}>
        guardar
      </button>
    </form>
  );
}
