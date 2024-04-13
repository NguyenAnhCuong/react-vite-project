import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ChangeUserPassword } from "../../utils/api/ApiServices";
import { useTranslation } from "react-i18next";

const ChangePassword = (props) => {
  const { t } = useTranslation();
  const account = useSelector((state) => state.user.account);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async () => {
    //validate
    // if (password !== account.password) {
    //   toast.error("Wrong password");
    //   return;
    // }
    if (password !== confirmPassword) {
      toast.error("Incorrect Confirm Password");
      return;
    }
    //api
    let res = await ChangeUserPassword(password, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      props.handleClose();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="d-flex gap-2">
        <div className="col-6 form-group">
          <label>{t("modal.profile.tabs.changePass.currPass")}</label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="col-6 form-group">
          <label>{t("modal.profile.tabs.changePass.newPass")}</label>
          <input
            className="form-control"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="col-6 form-group mt-3">
        <label>{t("modal.profile.tabs.changePass.confirmPass")}</label>
        <input
          className="form-control"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="my-3">
        <button
          onClick={() => handleUpdatePassword()}
          className="btn btn-warning"
        >
          {t("modal.profile.tabs.changePass.btn")}
        </button>
      </div>
    </>
  );
};
export default ChangePassword;
