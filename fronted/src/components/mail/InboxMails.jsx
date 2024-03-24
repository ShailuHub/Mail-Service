import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { mailAction } from "../../store/store";
import { baseUrl } from "../../constants/mailbox";
import MailBoxList from "./MailBoxList";

const InboxMails = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const mailsArray = useSelector((state) => state.mail.allMails);

  const fetchAllMails = async () => {
    try {
      const url = `${baseUrl}/api/mail/inbox`;
      const res = await Axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(mailAction.setMails(res.data.mails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMails();
  }, []);

  return <MailBoxList mailsArray={mailsArray} />;
};

export default InboxMails;
