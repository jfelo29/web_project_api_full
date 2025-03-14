import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login(props) {
const { signin } = props;
const [data, setData] = useState("");

const handleChange = (e) => {
    
    setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
 }));
};
function handleSubmit(event) {
    event.preventDefault();
    signin({ email: data.email, password: data.password });
    };

return (
    <div className="login">
        <p className="login__title">iniciar sesión</p>
        <form className="login__form" id="form-login">
            <label htmlFor="correo"></label>
            <input
                type="email"
                name="email"
                placeholder="email"
                id="input-email"
                className="login__item"
                required
                value={data.email}
                onChange={(event) =>  handleChange(event)}
            />
            <span className="login__input-error input-email-error"></span>

            <label htmlFor="password"></label>
            <input
                type="password"
                name="password"
                placeholder="password"
                id="input-password"
                className="login__item"
                required
                value={data.password}
                onChange={(event) => handleChange(event)}
            />
            <span className="login__input-error input-password-error"></span>
            <button className="login__begin" onClick={handleSubmit}>
                iniciar sesión
                </button>
                <Link to="/register" className="register__route">
                <p className="new__register">¿Aún no eres miembro? Regístrate aquí</p>
        </Link>

        </form>

        </div>
        );
}