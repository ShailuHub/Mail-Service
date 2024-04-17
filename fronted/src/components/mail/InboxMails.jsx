import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { mailAction } from "../../store/store";
import { baseUrl } from "../../constants/mailbox";
import MailBoxList from "./MailBoxList";
import MailBoxHeader from "./MailBoxHeader";

const InboxMails = () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const mailsArray = useSelector((state) => state.mail.inboxMails);

  const fetchAllMails = async () => {
    try {
      const url = `${baseUrl}/api/mail/inbox`;
      const res = await Axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const inboxMails = res.data.mails.map((mail) => {
        return {
          ...mail,
          mailType: "inboxMails",
        };
      });

      dispatch(mailAction.setInboxMails(inboxMails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMails();
    // // Set up interval for continuous polling
    // const interval = setInterval(() => {
    //   fetchAllMails();
    // }, 2000); // Adjust the interval as needed

    // // Clean up interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MailBoxHeader />
      <MailBoxList mailsArray={mailsArray} mailType="inboxMails" />
    </>
  );
};

export default InboxMails;
