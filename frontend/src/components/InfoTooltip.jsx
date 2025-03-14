
import Popup from "./Main/popup/Popup.jsx";
import okimage from "../images/checkok.png";
import negativeImage from "../images/negative-image.png";

export function InfoTooltip({ isOpen, onClose, isSuccess }) {

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            name="infoTooltip"

            showText={false}
            showButton={false}
        >
            {
                isSuccess
                    ? (
                        <img className="image__tools " src={okimage} alt="check ok image" />
                    ) : (
                        <img className="image__tools " src={negativeImage} alt="no check image" />
                    )
            }

            <p className="popup__text">
                {isSuccess
                    ? "¡Correcto! Ya estás registrado."
                    : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
            </p>
        </Popup >
    );
}

