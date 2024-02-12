import { MdOutlineForwardToInbox } from "react-icons/md";
import SpecialLink from "./SpecialLink";
import { BsFillSendFill } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import ComposeMail from "./ComposeMail";
import MailBoxList from "../mail/MailBoxList";
import MailBoxHeader from "../mail/MailBoxHeader";
import { specialLink } from "../../constants/mailbox";

const Home = () => {
  return (
    <>
      <section className="flex max-w-screen-wide">
        <div className="basis-1/6 min-w-[280px]  h-[calc(100vh-5rem)] pr-4 py-8">
          <ComposeMail />
          <ul className="flex flex-col space-y-2 py-6 pr-1">
            <li className="bg-white p-2 px-8 rounded-r-lg flex space-x-3 items-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105">
              <MdOutlineForwardToInbox className="text-black text-xl" />
              <a href="#inbox" className="text-black text-xl">
                Inbox
              </a>
            </li>
            {specialLink.map((item, idx) => {
              return (
                <SpecialLink
                  href={item.href}
                  label={item.value}
                  Icon={item.icon}
                  key={idx}
                />
              );
            })}
          </ul>
        </div>
        <div className="flex-1 bg-slate-800 h-[calc(100vh-5rem)] rounded-t-lg">
          <MailBoxHeader />
          <MailBoxList />
          <MailBoxList />
          <MailBoxList />
          <MailBoxList />
          <MailBoxList />
        </div>
        <div className="basis-1/8 h-[calc(100vh-5rem)] rounded-t-lg"></div>
      </section>
    </>
  );
};

export default Home;
