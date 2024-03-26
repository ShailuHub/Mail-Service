import MailBoxHelper from "./MailBoxHelper";

const MailBoxList = ({ mailsArray, mailType }) => {
  return (
    <div>
      {mailsArray.length > 0 &&
        mailsArray.map((mail) => (
          <MailBoxHelper key={mail.mailId} mail={mail} mailType={mailType} />
        ))}
    </div>
  );
};

export default MailBoxList;
