import { useDispatch, useSelector } from "react-redux";
import { mailBoxHeader } from "../../constants/mailbox";
import { mailAction } from "../../store/store";
import { baseUrl } from "../../constants/mailbox";
import Axios from "axios";

const MailBoxHeader = () => {
  const inboxMails = useSelector((state) => state.mail.inboxMails);
  const sentMails = useSelector((state) => state.mail.sentMails);
  const selectedMails = useSelector((state) => state.mail.selectedMails);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const updatedInboxMails = inboxMails.filter((mail) => {
        return (
          mail.mailType !== "inboxMails" ||
          !selectedMails.some(
            (selectedMail) => selectedMail.mailId === mail.mailId
          )
        );
      });
      const updatedSentMails = sentMails.filter((mail) => {
        return (
          mail.mailType !== "sentMails" ||
          !selectedMails.some(
            (selectedMail) => selectedMail.mailId === mail.mailId
          )
        );
      });
      dispatch(mailAction.setInboxMails(updatedInboxMails));
      dispatch(mailAction.setSentMails(updatedSentMails));
      const url = `${baseUrl}/api/mail/delete-mail`;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = {
        mailIds: selectedMails.map((mail) => {
          return { mailId: mail.mailId, mailType: mail.mailType };
        }),
      };
      await Axios.post(url, data, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Need to implement these fuction
  const handleArchive = () => {};

  const handleMove = () => {};

  const handleButtonClick = (action) => {
    switch (action) {
      case "delete":
        handleDelete();
        break;
      case "archive":
        handleArchive();
        break;
      case "move":
        handleMove();
        break;
    }
  };
  return (
    <div className="flex justify-center items-center space-x-5 h-16 text-lg border-b-2 mb-3 shadow-3xl rounded-t-xl">
      {mailBoxHeader.map((item, idx) => {
        return (
          <div
            className="flex space-x-1 items-center cursor-pointer"
            key={idx}
            onClick={() => handleButtonClick(item.action)}
          >
            {item.icon && <item.icon />}
            <span>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MailBoxHeader;
