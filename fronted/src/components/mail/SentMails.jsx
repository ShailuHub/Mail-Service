import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants/mailbox";
import Axios from "axios";
import MailBoxList from "./MailBoxList";
import { mailAction } from "../../store/store";
import { useEffect } from "react";
import MailBoxHeader from "./MailBoxHeader";

const SentMails = () => {
  const dispatch = useDispatch();
  const sentMailsArray = useSelector((state) => state.mail.sentMails);

  const fetchAllMails = async () => {
    try {
      const url = `${baseUrl}/api/mail/sent-mail`;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await Axios.get(url, { headers: { Authorization: token } });
      const sentMails = res.data.mails.map((mail) => {
        return { ...mail, mailType: "sentMails" };
      });
      dispatch(mailAction.setSentMails(sentMails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMails();
  }, []);

  return (
    <>
      <MailBoxHeader />
      <MailBoxList mailsArray={sentMailsArray} mailType="sentMails" />;
    </>
  );
};

export default SentMails;
