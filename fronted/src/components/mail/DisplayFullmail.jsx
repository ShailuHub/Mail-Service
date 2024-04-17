import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayFullmail = () => {
  const location = useLocation();
  const { mailType } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayMail = useSelector((state) => state.mail.displayMailObject);
  console.log(displayMail);

  // Determine email address based on mail type
  const getEmailAddress = () => {
    if (mailType === "inboxMail") return displayMail.sender.email;
    else if (mailType === "sentMail") return displayMail.reciever.email;
  };

  const { subject, body } = displayMail;

  const handleClose = () => {
    dispatch(mailAction.toggleShowMail());
    const destination = mailType === "inboxMail" ? "/auth/inbox" : "/auth/sent";
    navigate(destination);
  };

  return (
    <>
      <div className="p-5 border m-3 rounded-lg relative">
        <div
          className="absolute top-2 right-3 p-1 pl-3 pr-3 text-2xl cursor-pointer rounded-lg bg-red-500"
          onClick={handleClose}
        >
          x
        </div>
        <p className="text-firstColor text-xl mb-5">
          <span className="text-white">
            {mailType === "inboxMail" ? "From: " : "To: "}
          </span>
          {getEmailAddress()}
        </p>
        <p className="text-firstColor text-xl mb-5">
          <span className="text-white">Subject : </span>
          {subject}
        </p>
        <div>{body}</div>
      </div>
    </>
  );
};

export default DisplayFullmail;
