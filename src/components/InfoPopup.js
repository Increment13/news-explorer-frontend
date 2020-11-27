import React from 'react';
import PopupWithForm from './PopupWithForm';


function InfoPopup({ isOpen, onClose, onInfoClose, onDownEsc }) {

    React.useEffect(() => {
        document.addEventListener("keydown", onDownEsc, false);
    
        return () => {
          document.removeEventListener("keydown", onDownEsc, false);
        };
      }, []);
 
    return (
        <PopupWithForm
            name="infopopup"
            firstname="info"
            title="Пользователь успешно зарегистрирован!"
            isOpen={isOpen}
            onClose={onClose}
            onSwitchPopupOpen={onInfoClose}
        >
             <div className="popup__group-auth">
                <span className="popup__span-switch"><span className="popup__link-switch" onClick={onInfoClose}>Войти</span></span>
            </div>
        </PopupWithForm>
    );
}

export default InfoPopup;