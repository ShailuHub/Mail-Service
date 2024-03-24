import { useDispatch, useSelector } from "react-redux";
import { mailBoxHeader } from "../../constants/mailbox";
import { mailAction } from "../../store/store";
import { baseUrl } from "../../constants/mailbox";
import Axios from "axios";

const MailBoxHeader = () => {
  const mailsArray = useSelector((state) => state.mail.allMails);
  const selectedMails = useSelector((state) => state.mail.selectedMails);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const updatedMails = mailsArray.filter(
      (mail) => !selectedMails.includes(mail.mailId)
    );

    dispatch(mailAction.setMails(updatedMails));
    try {
      const url = `${baseUrl}/api/mail/delete-mail`;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = { mailIds: selectedMails };
      console.log(data);
      const res = await Axios.post(url, data, {
        headers: { Authorization: token },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
