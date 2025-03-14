import react, { useState }  from 'react';


  const Login = () => {
    const [data, setData] = useState({
      username: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    return (
<form className="popup__form popup__register" id="form-register">
      <input
        type="text"
        placeholder="mail"
        id="input-name"
        className="popup__item"
        minLength="2"
        maxLength="40"
        required
        name="mail"
        value={data.mail}
        onChange={handleNameChange}
      />
      <span className="popup__input-error input--error"></span>

      <input
        type="text"
        placeholder="contraseña"
        id="input-password"
        className="popup__item"
        minLength="2"
        maxLength="200"
        required
        name="about"
        value={data.password}
        onChange={handlePasswordChange}
      />
      <span className="popup__input-error input-password--error"></span>
      <button className="popup__submit" onClick={handleSubmit}>
        registrate
      </button>
    </form>
  );
}
    )