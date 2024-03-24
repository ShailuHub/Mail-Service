import SpecialLink from "./SpecialLink";
import ComposeMail from "./ComposeMail";
import MailBoxHeader from "../mail/MailBoxHeader";
import { specialLink } from "../../constants/mailbox";
import { useState } from "react";
import MailEditor from "../mail/MailEditor";
import InboxMails from "../mail/InboxMails";
import { useNavigate } from "react-router-dom";
import SentMails from "../mail/SentMails";

const Home = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("inbox");
  const [showHeaders, setShowHeaders] = useState(false);

  const handleComposeButton = () => {
    setShowHeaders(true);
    setContent("compose");
  };

  const handleOnCancel = () => {
    setShowHeaders(false);
    setContent("inbox");
  };

  const handleSpecialLinkButton = (action) => {
    navigate(`/auth/${action}`);
    setShowHeaders(false);
    setContent(action);
  };

  const renderComponent = () => {
    switch (content) {
      case "inbox":
        return <InboxMails />;
      case "sent":
        return <SentMails />;
      case "draft":
        console.log("Draft");
        break;
      case "compose":
        return <MailEditor onCancel={handleOnCancel} />;
      default:
        return <InboxMails />;
    }
  };
  return (
    <>
      <section className="flex max-w-screen-wide">
        <div className="basis-1/6 min-w-[280px]  h-[calc(100vh-5rem)] pr-4 py-8">
          <ComposeMail onClick={handleComposeButton} />
          <ul className="flex flex-col space-y-2 py-6 pr-1">
            {/* <li className="bg-white p-2 px-8 rounded-r-lg flex space-x-3 items-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105">
              <MdOutlineForwardToInbox className="text-black text-xl" />
              <a href="#inbox" className="text-black text-xl">
                Inbox
              </a>
            </li> */}
            {specialLink.map((item, idx) => {
              return (
                <SpecialLink
                  href={item.href}
                  label={item.value}
                  Icon={item.icon}
                  key={idx}
                  onClick={() => handleSpecialLinkButton(item.action)}
                />
              );
            })}
          </ul>
        </div>
        {!showHeaders ? (
          <div className="flex-1 bg-slate-800 h-[calc(100vh-5rem)] rounded-t-lg">
            <MailBoxHeader />
            {renderComponent()}
          </div>
        ) : (
          <div className="flex-1 bg-slate-800 h-[calc(100vh-5rem)] rounded-t-lg">
            {renderComponent()}
          </div>
        )}

        <div className="basis-1/8 h-[calc(100vh-5rem)] rounded-t-lg"></div>
      </section>
    </>
  );
};

export default Home;
