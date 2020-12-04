import React from 'react';

function PopupWithForm(props) {
    return (
        <div id={`popup-${props.firstname}`} className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onKeyDown={props.onDownEsc}>
            <div className="popup__center">
                <form className="popup__container" action="#" name={props.name}>
                    <h2 className="popup__header">{props.title}</h2>
                    {props.children}
                </form>
                <button className="popup__close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
} 

export default PopupWithForm;