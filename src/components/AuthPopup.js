import React from 'react';
import PopupWithForm from './PopupWithForm';

function AuthPopup({ onAuth, hadleLogin, isOpen, onClose, onSwitchPopupOpen, onDownEsc }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [spanError, setSpanError] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isEmailError, setIsEmailError] = React.useState(false);
    const [isPasswordError, setIsPasswordError] = React.useState(false);

    const inputEmail = React.useRef();
    const inputPassword = React.useRef();
    const spanEmailError = React.useRef();
    const spanPasswordError = React.useRef();

    function handleEmailChange(e) {
        setEmail(e.target.value);
        if (e.target.checkValidity()) {
            setIsEmailError(false);
        } else {
            setIsEmailError(true);
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        if (e.target.checkValidity()) {
            setIsPasswordError(false);
        } else {
            setIsPasswordError(true);
        }
    }

    React.useEffect(() => {
        if (inputEmail.current.checkValidity() && inputPassword.current.checkValidity()) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email, password]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setIsEmailError(false);
        setIsPasswordError(false);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!email || !password) {
            return;
        }

        onAuth(email, password)
            .then(() => {
                resetForm();
                hadleLogin();
                onClose();
            })
            .catch(() => setSpanError('Неверный логин или пароль'));
    };

    React.useEffect(() => {
        document.addEventListener("keydown", onDownEsc, false);
    
        return () => {
          document.removeEventListener("keydown", onDownEsc, false);
        };
      }, []);


    return (
        <PopupWithForm
            name="formauth"
            title="Войти"
            isOpen={isOpen}
            onClose={onClose}
            onSwitchPopupOpen={onSwitchPopupOpen}
        >
            <label className="popup__label-input">
                <span className="popup__span-name">Email</span>
                <input 
                id="email" 
                name="email" 
                type="email" 
                className="popup__input"
                required minLength="6"          
                pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                placeholder="Введите почту" 
                value={email || ''} 
                onChange={handleEmailChange}
                ref={inputEmail}
                
                 />
                <span id="input-email-error" className="popup__span-error" ref={spanEmailError}>{isEmailError ? "Адрес неполный или некорректный" : ""}</span>
            </label>
            <label className="popup__label-input">
                <span className="popup__span-name">Пароль</span>
                <input 
                id="password" 
                name="password" 
                className="popup__input" 
                type="password" 
                required
                placeholder="Введите пароль" 
                value={password || ''} 
                onChange={handlePasswordChange}
                ref={inputPassword} />
                <span className="popup__span-error" id="input-password-error" ref={spanPasswordError}>{isPasswordError ? inputPassword.current.validationMessage : ""}</span>
            </label>
            <div className="popup__group-auth">
                <span className="popup__span-error">{spanError}</span>
                <button
                    type="submit"
                    className={`popup__button popup__button-add ${isDisabled ? 'button_inactive' : ""}`}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                >Войти</button>
                <span className="popup__span-switch">или <span className="popup__link-switch" onClick={onSwitchPopupOpen}>Зарегестрироваться</span></span>
            </div>
        </PopupWithForm>
    );
}

export default AuthPopup;