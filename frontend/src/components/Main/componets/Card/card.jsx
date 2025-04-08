export default function Card(props) {
  const { name, link } = props.card;
  //const isLiked = props.card.isLiked;
  const isLiked = props.card.likes ? props.card.likes.length > 0 : false;
  const onCardDelete = props.card.onCardDelete;

  const cardLikeButtonClassName = `card__like ${isLiked ? "card__like-icon_active" : ""
    }`;

  function handleLikeClick() {
    props.onCardLike();
  }
  function handleDeleteClick() {
    props.onCardDelete();
  }
  /*  function handleCreateCard() {
    props.onCardCreate();
  } */
  return (
    <div className="card cards__list">
      <div className="card__delate-icon" onClick={handleDeleteClick}></div>
      <img src={link} alt="card" className="card__image" />
      <div className="card__menu">
        <h2 className="card__title">{name}</h2>

        <button
          className={cardLikeButtonClassName}
          onClick={() => handleLikeClick()}
        ></button>
        <p className="pruebalikes"></p>
      </div>
    </div>
  );
}
