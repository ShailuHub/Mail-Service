import MailBoxHelper from "./MailBoxHelper";

const MailBoxList = ({ mailsArray }) => {
  return (
    <div>
      {mailsArray.length > 0 &&
        mailsArray.map((mail) => (
          <MailBoxHelper key={mail.mailId} mail={mail} />
        ))}
    </div>
  );
};

export default MailBoxList;
