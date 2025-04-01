import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfile from "./form/EditProfile/EditProfile.jsx";
import EditAvatar from "./form/EditAvatar/EditAvatar.jsx";
import NewCard from "./form/NewCard/NewCard.jsx";
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { InfoTooltip } from './InfoTooltip.jsx';
import { signup, signin, GetInfo } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken, getToken, removeToken } from '../utils/token';
function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCard] = useState([]);
  //const [jwt, setJwt] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile
        handleUpdateUser={handleUpdateUser}
        handleOpenPopupEditProfile={handleOpenPopupEditProfile}
      />
    ),
  };
  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar handleUpdateAvatar={handleUpdateAvatar} />,
  };
  const newCardPopup = {
    title: "Crear nueva tarjeta",
    children: (
      <NewCard
        onAddPlaceSubmit={handleAddPlaceSubmit}
        handleOpenPopupNewCard={handleOpenPopupNewCard}
      />
    ),
  };
  useEffect(() => {
    const tokepPrueba = localStorage.getItem("jwt")
    const jwt = getToken()
    console.log(jwt)

    if (!tokepPrueba) {
      return;

    }
    api.getUserInfo().then((otraData) => {
      GetInfo().then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({ ...otraData, email: data.data.email })
        navigate('/');
      })
    })


      .catch((err) => {
        console.log(err);
      });


  }, [isLoggedIn]);
  console.log(currentUser);

  function handleOpenPopupNewCard() {
    setPopup(newCardPopup);
  }
  function handleOpenPopupEditProfile() {
    setPopup(editProfilePopup);
  }
  function handleOpenPopupEditAvatar() {
    setPopup(editAvatarPopup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  function handleCloseInfoTooltip() {
    setIsInfoTooltip(false);
  }
  async function handleUpdateUser(data) {
    await api.editUser(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }
  async function handleUpdateAvatar(data) {
    await api.profileImage(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }
  async function handleAddPlaceSubmit(data) {
    await api.createcard(data).then((newData) => {
      setCard([newData, ...cards]);
      handleClosePopup();
    });
  }
  async function handleSignin(data) {
    signin(data).then((newData) => {
      if (newData.token) {
        setToken(newData.token);

        setIsLoggedIn(true);
        setIsInfoTooltip(true);
        navigate('/');


        setIsRegistrationSuccess(true);
      } else {
        setIsInfoTooltip(true);
        setIsRegistrationSuccess(false);

      }
    }).catch((err) => {
      setIsInfoTooltip(true);
      setIsRegistrationSuccess(false);
    });



  }

  async function handleSignout() {
    removeToken();
    setIsLoggedIn(false);
    const redirectPath = location.state?.from?.pathname || "/login";
    navigate(redirectPath);
    setCurrentUser({});
    setJwt(null);


  }
  async function handleSignup(data) {
    signup(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
      navigate('/login');
      setIsRegistrationSuccess(true);
    }).catch((err) => {
      console.log(err);
      setIsRegistrationSuccess(false);
    });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignout={handleSignout}
          email={currentUser.email} />


        <Routes>
          <Route path="/" element={
            <ProtectedRoute isloggedIn={isLoggedIn}>

              <Main
                setCurrentUser={setCurrentUser}
                onHandleUpdateUser={handleUpdateUser}
                onHandleUpdateAvatar={handleUpdateAvatar}
                handleOpenPopupEditAvatar={handleOpenPopupEditAvatar}
                handleOpenPopupEditProfile={handleOpenPopupEditProfile}
                handleOpenPopupNewCard={handleOpenPopupNewCard}
                handleClosePopup={handleClosePopup}
                handleAddPlaceSubmit={handleAddPlaceSubmit}
                popup={popup}
                cards={cards}
                setCard={setCard} />
            </ProtectedRoute>} />
          <Route path="/login" element={<Login signin={handleSignin} />} />

          <Route path="/register" element={<Register signup={handleSignup} />} />

        </Routes>
        {isInfoTooltip && <InfoTooltip isOpen={isInfoTooltip}
          onClose={handleCloseInfoTooltip}
          isSuccess={isRegistrationSuccess}>
        </InfoTooltip>}

        <Footer />

      </div>

    </CurrentUserContext.Provider>

  );
}



export default App;

