import { useDispatch, useSelector } from "react-redux";
import { baseUrl, convertDate, convertTime } from "../../constants/mailbox";
import { mailAction } from "../../store/store";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const MailBoxHelper = ({ mail, mailType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inboxMailsArray = useSelector((state) => state.mail.inboxMails);
  const sentMailsArray = useSelector((state) => state.mail.sentMails);
  const { mailId, subject, body, isRead, createdAt } = mail;

  const emailAddress = mail.sender
    ? mail.sender.email.split("@")[0]
    : mail.reciever.email.split("@")[0];

  const handleCheckedMail = (event, mailId, mailType) => {
    const isChecked = event.target.checked;
    const action = isChecked
      ? mailAction.setSelectedMails
      : mailAction.setDeselectedMails;
    dispatch(action({ mailId, mailType }));
  };

  const handleOnReadMail = async (mailId) => {
    const mailsArray =
      mailType === "inboxMails" ? inboxMailsArray : sentMailsArray;
    const index = mailsArray.findIndex((mail) => mailId === mail.mailId);
    if (mailType === "inboxMails") {
      const isRead = inboxMailsArray[index].isRead;
      if (index !== -1 && !isRead) {
        const updatedMailsArray = [...inboxMailsArray];
        updatedMailsArray[index] = {
          ...updatedMailsArray[index],
          isRead: true,
        };
        dispatch(mailAction.setInboxMails(updatedMailsArray));
        try {
          const url = `${baseUrl}/api/mail/update-mail?mailId=${mailId}`;
          const { token } = JSON.parse(localStorage.getItem("user"));
          const res = await Axios.patch(url, null, {
            headers: { Authorization: token },
          });
          console.log(res.data);
          dispatch(mailAction.toggleShowMail());
          dispatch(mailAction.setDisplayMail(res.data));
          navigate("/auth/displayMail", { state: { mailType: "inboxMail" } });
        } catch (error) {
          console.log(error);
        }
      } else if (isRead) {
        dispatch(mailAction.toggleShowMail());
        dispatch(mailAction.setDisplayMail(inboxMailsArray[index]));
        navigate("/auth/displayMail", { state: { mailType: "inboxMail" } });
        console.log(inboxMailsArray[index]);
      }
    } else {
      dispatch(mailAction.toggleShowMail());
      dispatch(mailAction.setDisplayMail(sentMailsArray[index]));
      navigate("/auth/displayMail", { state: { mailType: "sentMail" } });
      console.log(sentMailsArray[index]);
    }
  };

  return (
    <div className="px-4 py-2 w-[100%]">
      <div className="flex relative items-center justify-between  border-gray-300 py-2 space-x-1 cursor-pointer">
        <div className="flex flex-1 max-w-[80%] items-center space-x-2 font-roboto ">
          <input
            type="checkbox"
            className="mr-2 min-w-6 min-h-6"
            onChange={(event) => handleCheckedMail(event, mailId, mailType)}
          />
          {!isRead && mailType === "inboxMails" && (
            <div className="w-3 h-3 bg-firstColor rounded-full"></div>
          )}
          <div
            className="flex flex-1 space-x-8 items-center justify-start"
            onClick={() => handleOnReadMail(mailId)}
          >
            <p className="font-semibold text-firstColor text-lg font-montserrat">
              {emailAddress}
            </p>
            <p className="text-white-400 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-[30rem] font-palanquin space-x-3">
              <span className="font-semibold">{subject}</span>
              <span> - </span>
              <span className="text-fourthColor">{body}</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-3 w-32 justify-center absolute right-0">
          <p className="text-sm text-white">{convertDate(createdAt)}</p>
          <p className="text-sm text-white">{convertTime(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default MailBoxHelper;
