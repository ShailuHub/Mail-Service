import { useSelector } from "react-redux";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import NavBar from "./components/user/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./components/user/HomePage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <NavBar />
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/auth/signin" />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/auth/signin" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
