import Modal from '../UI/Modal';


const ConfirmAction = props => {
  return (
    <Modal onClose={props.onClose} className={classes.confirm}>
      <h2>Are you sure?</h2>
      <p>{props.children}</p>
      <button
        type="button"
        onClick={props.onConfirm}
        className={`btn ${classes.confirm__btn}`}
      >
        Confirm
      </button>
    </Modal>
  );
};

export default ConfirmAction;
