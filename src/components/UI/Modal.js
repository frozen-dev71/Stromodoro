import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalWindow = props => {
  return (
    <div className={`${classes.modal} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById('overlays');
const Modal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalWindow className={props.className}>
          <button
            className={classes['modal__btn-close']}
            onClick={props.onClose}
          >
            &#10006;
          </button>
          {props.children}
        </ModalWindow>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
