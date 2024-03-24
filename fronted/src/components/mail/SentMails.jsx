import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../constants/mailbox";
import Axios from "axios";
import MailBoxList from "./MailBoxList";
import { mailAction } from "../../store/store";
import { useEffect } from "react";

const SentMails = () => {
  const dispatch = useDispatch();
  const sentMailsArray = useSelector((state) => state.mail.sentMails);

  const fetchAllMails = async () => {
    try {
      const url = `${baseUrl}/api/mail/sent-mail`;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await Axios.get(url, { headers: { Authorization: token } });
      console.log(res.data);
      dispatch(mailAction.setSentMails(res.data.mails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMails();
  }, []);

  return <MailBoxList mailsArray={sentMailsArray} />;
};

export default SentMails;
