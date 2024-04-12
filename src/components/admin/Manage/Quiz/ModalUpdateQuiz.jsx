import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { UpdateQuizforAdmin } from "../../../utils/api/ApiServices";
import { useTranslation } from "react-i18next";

const ModalUpdateQuiz = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataQuiz } = props;
  // const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setDifficulty("EASY");
    setImage("");
    setPreviewImg("");
    props.resetDataUpdateQuiz();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataQuiz)) {
      setName(dataQuiz.name);
      setDescription(dataQuiz.description);
      setDifficulty(dataQuiz.difficulty);
      setImage("");
      if (dataQuiz.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataQuiz.image}`);
      }
    }
  }, [dataQuiz]);

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    //validate
    //api
    const res = await UpdateQuizforAdmin(
      dataQuiz.id,
      name,
      description,
      difficulty,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchListQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("admin.managequiz.listquiz.modal.update.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>
                  {t("admin.managequiz.listquiz.modal.update.name")}
                </label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group col-5">
                <label>
                  {t("admin.managequiz.listquiz.modal.update.description")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>
                  {t("admin.managequiz.listquiz.modal.update.difficulty.title")}
                </label>
                <select
                  value={difficulty}
                  className="form-select"
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="EASY">
                    {t(
                      "admin.managequiz.listquiz.modal.update.difficulty.EASY"
                    )}
                  </option>
                  <option value={"MEDIUM"}>
                    {t(
                      "admin.managequiz.listquiz.modal.update.difficulty.MEDIUM"
                    )}
                  </option>
                  <option value={"HARD"}>
                    {t(
                      "admin.managequiz.listquiz.modal.update.difficulty.HARD"
                    )}
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group col-12 mt-2">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("admin.managequiz.listquiz.modal.update.uploadImage")}
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUpload(e)}
              />
            </div>
            <div className="form-group col-12 mt-2 img-preview">
              {previewImg ? (
                <img src={previewImg} />
              ) : (
                <span>
                  {t("admin.managequiz.listquiz.modal.update.preview")}
                </span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.managequiz.listquiz.modal.update.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            {t("admin.managequiz.listquiz.modal.update.btn.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateQuiz;
