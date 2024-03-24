import ResetPassword from "./components/auth/ResetPassword";
import ResetPasswordRequest from "./components/auth/ResetPasswordRequest";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Verification from "./components/auth/Verification";
import Home from "./components/user/Home";
import NavBar from "./components/user/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/auth/home" element={<Home />} />
        <Route path="/auth/inbox" element={<Home />} />
        <Route path="/auth/sent" element={<Home />} />
        <Route path="/auth/draft" element={<Home />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/reset-password-link" element={<ResetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPasswordRequest />} />
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/auth/sentMail" element={<Home />} />
        <Route path="*" element={<Navigate to="/auth/signup" />} />
      </Routes>
    </>
  );
};

export default App;
