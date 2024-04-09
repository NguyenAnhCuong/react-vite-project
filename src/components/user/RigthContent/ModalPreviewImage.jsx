import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPreviewImage3 = (props) => {
  const { show, setShow, dataImage } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Question Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex"
            style={{
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              height: "400px",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src={`data:image/jpeg;base64,${dataImage.image}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPreviewImage3;
