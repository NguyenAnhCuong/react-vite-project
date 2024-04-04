import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result The Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Total Questions:{dataModalResult.countTotal}</b>
          </div>
          <div>
            <b>Total Correct Answer:{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Show Answers
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
