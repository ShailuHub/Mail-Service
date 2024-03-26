import { useDispatch, useSelector } from "react-redux";
import { baseUrl, convertDate, convertTime } from "../../constants/mailbox";
import { mailAction } from "../../store/store";
import Axios from "axios";

const MailBoxHelper = ({ mail, mailType }) => {
  const inboxMailsArray = useSelector((state) => state.mail.inboxMails);
  const dispatch = useDispatch();
  const { mailId, subject, body, isRead, createdAt } = mail;
  let senderEmail = "";

  if (mail.sender) {
    senderEmail = mail.sender.email.split("@")[0];
  } else if (mail.reciever) {
    senderEmail = mail.reciever.email.split("@")[0];
  }

  const handleCheckedMail = (event, mailId, mailType) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      dispatch(mailAction.setSelectedMails({ mailId, mailType }));
    } else {
      dispatch(mailAction.setDeselectedMails({ mailId, mailType }));
    }
  };

  const handleOnReadMail = async (mailId) => {
    const index = inboxMailsArray.findIndex((mail) => mailId === mail.mailId);
    if (index !== -1) {
      const updatedMailsArray = [...inboxMailsArray];
      updatedMailsArray[index] = {
        ...updatedMailsArray[index],
        isRead: true,
      };
      dispatch(mailAction.setInboxMails(updatedMailsArray));
      try {
        const url = `${baseUrl}/api/mail/update-mail?mailId=${mailId}`;
        const { token } = JSON.parse(localStorage.getItem("user"));
        await Axios.patch(url, null, {
          headers: { Authorization: token },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="px-4 py-2 ">
      <div className="flex items-center justify-between border-b border-gray-300 py-2 space-x-1">
        <div className="flex flex-1 items-center space-x-2 font-roboto">
          <input
            type="checkbox"
            className="mr-2 h-6 w-6"
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
              {senderEmail}
            </p>
            <p className="text-white-400 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-[48rem] font-palanquin space-x-3">
              <span className="font-semibold">{subject}</span>
              <span> - </span>
              <span className="text-fourthColor">{body}</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <p className="text-sm text-white">{convertDate(createdAt)}</p>
          <p className="text-sm text-white">{convertTime(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default MailBoxHelper;
