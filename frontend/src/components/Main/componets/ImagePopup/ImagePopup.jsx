export default function ImagePopup(props) {
  return (
    <div className="popup__image">
      <img src={props.image} alt="image" className="popup__image-image" />
    </div>
  );
}
