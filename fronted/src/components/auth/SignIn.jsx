import FormInput from "./FormInput";
import FormTitle from "./FormTitle";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import FormButton from "./FormButton";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useRef } from "react";

const baseUrl = "http://localhost:3000";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSignInForm = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    try {
      const url = `${baseUrl}/api/user/signin`;
      const res = await Axios.post(url, {
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="absolute bg-slate-gray shadow-custom-shadow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-8 py-10 rounded-lg w-[23rem]">
      <FormTitle value="SIGN IN" />
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
