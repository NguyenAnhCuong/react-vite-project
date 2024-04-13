import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FcPlus } from "react-icons/fc";
import "./UserInfo.scss";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { UpdateUserInfo } from "../../utils/api/ApiServices";
import { toast } from "react-toastify";

const UserInfo = (props) => {
  const account = useSelector((state) => state.user.account);

  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUserName(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImg(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleUpdateInfo = async () => {
    let res = await UpdateUserInfo(username, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      props.handleClose();
    } else {
      toast.error(res.EM);
      return;
    }
  };

  return (
    <div className="userinfo-container">
      <div className="row userinfo">
        <div className="form-group col-4">
          <label>{t("modal.profile.tabs.userInfo.name")}</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group col-4">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group col-4">
          <label>{t("modal.profile.tabs.userInfo.role.title")}</label>
          <select
            value={role}
            className="form-select"
            onChange={(e) => setRole(e.target.value)}
            disabled
          >
            <option value="USER">
              {t("modal.profile.tabs.userInfo.role.user")}
            </option>
            <option value={"ADMIN"}>
              {t("modal.profile.tabs.userInfo.role.admin")}
            </option>
          </select>
        </div>
      </div>
      <div className="form-group col-12 mt-3 upload-img">
        <label className="form-label label-upload" htmlFor="labelUpload">
          <FcPlus />
          {t("modal.profile.tabs.userInfo.uploadImage")}
        </label>
        <input
          type="file"
          hidden
          id="labelUpload"
          onChange={(e) => handleUpload(e)}
        />
      </div>
      <div className="form-group col-12 mt-3 img-preview">
        {previewImg ? (
          <img src={previewImg} />
        ) : (
          <span>{t("modal.profile.tabs.userInfo.preview")}</span>
        )}
      </div>
      <div className="mt-3 mb-3">
        <button className="btn btn-success" onClick={() => handleUpdateInfo()}>
          {t("modal.profile.tabs.userInfo.btn")}
        </button>
      </div>
    </div>
  );
};
export default UserInfo;
