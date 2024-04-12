import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;
  const { t } = useTranslation();

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.result.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>
              {t("modal.result.text1")}:{dataModalResult.countTotal}
            </b>
          </div>
          <div>
            <b>
              {t("modal.result.text2")}:{dataModalResult.countCorrect}
            </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modal.result.close")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("modal.result.show")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
