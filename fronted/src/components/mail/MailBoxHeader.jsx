import { mailBoxHeader } from "../../constants/mailbox";

const MailBoxHeader = () => {
  return (
    <div className="flex justify-center items-center space-x-3 h-16 text-lg border-b-2 mb-3 shadow-3xl rounded-t-xl">
      {mailBoxHeader.map((item, idx) => {
        return (
          <div className="flex space-x-1 items-center" key={idx}>
            {item.icon && <item.icon />}
            <span>{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MailBoxHeader;
