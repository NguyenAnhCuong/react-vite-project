import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../utils/api/ApiServices";

const ModalPreviewImage2 = (props) => {
  const { show, setShow, dataImage } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete A Quiz</Modal.Title>
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
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                {dataImage.title}
              </span>
            </div>
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src={dataImage.url}
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

export default ModalPreviewImage2;
