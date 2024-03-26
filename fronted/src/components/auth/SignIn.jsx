import FormInput from "./FormInput";
import FormTitle from "./FormTitle";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import FormButton from "./FormButton";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useRef, useState } from "react"; // Import useState
import { useDispatch } from "react-redux";
import { authAction } from "../../store/store";
import AuthError from "../modals/ResponseMessage"; // Import AuthError component

const baseUrl = "http://localhost:3000";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(""); // State to manage error
  const handleSignInForm = async (event) => {
    event.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const url = `${baseUrl}/api/user/signin`;
      const res = await Axios.post(url, {
        email,
        password,
      });
      const { message, token, user } = res.data;

      dispatch(
        authAction.signIn({
          token,
          username: user.username,
          email: user.email,
        })
      );
      navigate("/auth/inbox");
    } catch (error) {
      setError(error.response.data);
      emailRef.current.value = "";
      passwordRef.current.value = "";

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <section className="absolute bg-slate-gray shadow-custom-shadow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-8 py-10 rounded-lg w-[23rem]">
      <FormTitle value="SIGN IN" />
      {error && <AuthError errorMessage={error} />}{" "}
      <form>
        <FormInput
          type="email"
          name="email"
          Icon={AiOutlineMail}
          placeholder="Email"
          ref={emailRef}
        />
        <FormInput
          type="password"
          name="password"
          Icon={RiLockPasswordFill}
          placeholder="Password"
          ref={passwordRef}
        />
        <FormButton value="SIGN IN" onClick={handleSignInForm} />
      </form>
      <div className="text-center text-lg p-2 mt-12 flex justify-between items-center text-fourthColor">
        <Link to="/auth/reset-password-link">Forgot Password</Link>
        <Link to="/auth/signup" className="text-firstColor">
          SignUp
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
