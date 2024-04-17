import ComposeMail from "./ComposeMail";
import SpecialLink from "./SpecialLink";
import { specialLink } from "../../constants/mailbox";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import InboxMails from "../mail/InboxMails";
import { useSelector } from "react-redux";
import ResetPasswordRequest from "../auth/ResetPasswordRequest";
import DisplayFullmail from "../mail/DisplayFullmail";
import Verification from "../auth/Verification";
import ResetPassword from "../auth/ResetPassword";
import SentMails from "../mail/SentMails";
import MailEditor from "../mail/MailEditor";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleComposeButton = () => {
    navigate("/auth/compose-mail");
  };

  const handleOnCancel = () => {
    navigate("/auth/inbox");
  };

  const handleSpecialLinkButton = (action) => {
    navigate(`/auth/${action}`);
  };

  return (
    <>
      <section className="flex w-[100%]">
        <div className="min-w-[200px]  h-[calc(100vh-5rem)] pr-4 py-8">
          <ComposeMail onClick={handleComposeButton} />
          <ul className="flex flex-col space-y-2 py-6 pr-1">
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
        <div className=" bg-slate-800 flex-1 h-[calc(100vh-5rem)] rounded-t-lg">
          {isLoggedIn && (
            <Routes>
              <Route path="/auth/home" element={<InboxMails />} />
              <Route path="/auth/inbox" element={<InboxMails />} />
              <Route path="/auth/sent" element={<SentMails />} />
              <Route path="/auth/draft" element={<InboxMails />} />
              <Route
                path="/auth/compose-mail"
                element={<MailEditor onCancel={handleOnCancel} />}
              />
              <Route
                path="/auth/signup"
                element={<Navigate to="/auth/home" />}
              />
              <Route
                path="/auth/signin"
                element={<Navigate to="/auth/home" />}
              />
              <Route
                path="/auth/reset-password-link"
                element={<ResetPassword />}
              />
              <Route
                path="/auth/reset-password"
                element={<ResetPasswordRequest />}
              />
              <Route path="/auth/verification" element={<Verification />} />
              <Route path="/auth/displayMail" element={<DisplayFullmail />} />
            </Routes>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
