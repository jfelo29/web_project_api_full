import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const { signup } = props;
  const [data, setData] = useState({});



  const handleChange = (e) => {

    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


  function handleSubmit(event) {
    event.preventDefault();
    signup({ email: data.email, password: data.password });
  }

  return (
    <div className="register">
      <p className="register__title">registrate</p>
      <form className="register__form" id="form-register">
        <label htmlFor="mail"></label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="correo electronico"
          className="register__item"
          required
          value={data.email}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="contraseña"
          className="register__item"
          required
          value={data.password}
          onChange={(e) => handleChange(e)}
        />
        <button className="register__button" type="submit" onClick={handleSubmit}>
          registrarte
        </button>
        <Link to="/login" className="login__route">
          <button className="new__register" type="button">¿Ya eres miembro? Inicia sesión aquí</button>
        </Link>
      </form>

    </div>

  );
}   