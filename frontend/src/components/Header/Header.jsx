import logo from "../../images/around-the-us.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Header(props) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(currentUser._id);


  return (
    <header className="header" >
      <div className="header__container">
        <img src={logo} alt="logo" className="header__logo" />
        <div className="header__title">


        </div>
        <div className="header__buttons">
          {currentUser?._id ? (
            <div>
              < span className="header__mail">{props.email} </span>
              <button className=" header__button" onClick={props.handleSignout}> cerrar sesión </button>
            </div>
          ) : location.pathname === "/login" ? (
            <Link to="/register" className="headerbutton">
              Registrate
            </Link>
          ) :
            (
              <Link to="/login" className="headerbutton">
                Iniciar sesión
              </Link>
            )}

        </div>

      </div>

    </header >
  );
}
/*{currentUser.email}
      {currentUser.email ?(<div onClick={props.handleSignout}>cerrar sesion</div>):(<div>iniciar sesion</div>)}*/