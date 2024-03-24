import { useDispatch } from "react-redux";
import { convertDate, convertTime } from "../../constants/mailbox";
import { mailAction } from "../../store/store";

const MailBoxHelper = ({ mail }) => {
  const dispatch = useDispatch();
  const { mailId, subject, body, sender, createdAt } = mail;
  const senderEmail = sender.email.split("@")[0];
  const handleCheckedMail = (event, mailId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      dispatch(mailAction.setSelectedMails(mailId));
    } else {
      dispatch(mailAction.setDeselectedMails(mailId));
    }
  };
  return (
    <div className="px-4 py-2 ">
      <div className="flex items-center justify-between border-b border-gray-300 py-2 space-x-6">
        <div className="flex flex-1 items-center space-x-2 font-roboto">
          <input
            type="checkbox"
            className="mr-2 h-6 w-6"
            onChange={(event) => handleCheckedMail(event, mailId)}
          />
          <div className="flex flex-1 space-x-8 items-center justify-start">
            <p className="font-semibold text-firstColor text-lg font-montserrat">
              {senderEmail}
            </p>
            <p className="text-white-400 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-[48rem] font-palanquin">
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
