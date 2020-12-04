import React from 'react';
import PopupWithForm from './PopupWithForm';
import * as auth from '../api/AuthApi.js';

function RegistrationPopup({ isOpen, onClose, onSwitchPopupOpen, onDownEsc, handleInfoOpen }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [spanError, setSpanError] = React.useState('');

    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isEmailError, setIsEmailError] = React.useState(false);
    const [isPasswordError, setIsPasswordError] = React.useState(false);
    const [isNameError, setIsNameError] = React.useState(false);

    const inputEmail = React.useRef();
    const inputPassword = React.useRef();
    const inputName = React.useRef();
    const spanEmailError = React.useRef();
    const spanPasswordError = React.useRef();
    const spanNameError = React.useRef();

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

    function handleNameChange(e) {
        setName(e.target.value);
        if (e.target.checkValidity()) {
            setIsNameError(false);
        } else {
            setIsNameError(true);
        }
    }

    React.useEffect(() => {
        if (inputEmail.current.checkValidity() && inputPassword.current.checkValidity()) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email, password, name]);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        auth.register(email, password, name)
            .then((res) => {
                if (res.statusCode !== 400 || res.data)
                onClose();
                handleInfoOpen();
            })
            .catch(() => setSpanError('Такой Email уже зарегестрирован'));;

    };

    React.useEffect(() => {
        document.addEventListener("keydown", onDownEsc, false);
    
        return () => {
          document.removeEventListener("keydown", onDownEsc, false);
        };
      }, []);


    return (
        <PopupWithForm
            name="formreg"
            firstname="reg"
            title="Регистрация"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onSwitchPopupOpen={onSwitchPopupOpen}
        >
            <label className="popup__label-input">
                <span className="popup__span-name">Email</span>
                <input
                    id="email-reg"
                    name="email"
                    type="email"
                    className="popup__input"
                    required minLength="6"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    placeholder="Введите почту"
                    value={email || ''}
                    onChange={handleEmailChange}
                    ref={inputEmail}
                />
                <span id="input-email-error-reg" className="popup__span-error" ref={spanEmailError}>{isEmailError ? "Адрес неполный или некорректный" : ""}</span>
            </label>
            <label className="popup__label-input">
                <span className="popup__span-name">Пароль</span>
                <input
                    id="password-reg"
                    name="password"
                    className="popup__input"
                    type="password"
                    required
                    placeholder="Введите пароль"
                    value={password || ''}
                    onChange={handlePasswordChange}
                    ref={inputPassword} />
                <span className="popup__span-error" id="input-password-error-reg" ref={spanPasswordError}>{isPasswordError ? inputPassword.current.validationMessage : ""}</span>
            </label>

            <label className="popup__label-input">
                <span className="popup__span-name">Имя</span>
                <input
                    id="name-reg"
                    name="name"
                    className="popup__input"
                    type="text"
                    required
                    placeholder="Введите своё имя"
                    value={name || ''}
                    onChange={handleNameChange}
                    ref={inputName} />
                <span className="popup__span-error" id="input-name-error-reg" ref={spanNameError}>{isNameError ? inputName.current.validationMessage : ""}</span>
            </label>
            <div className="popup__group-auth">
                <span className="popup__span-error">{spanError}</span>
                <button
                    type="submit"
                    className={`popup__button popup__button-add ${isDisabled ? 'button_inactive' : ""}`}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                >Зарегестрироваться</button>
                <span className="popup__span-switch">или <span className="popup__link-switch" onClick={onSwitchPopupOpen}>Зарегестрироваться</span></span>
            </div>
        </PopupWithForm>
    );
}

export default RegistrationPopup;