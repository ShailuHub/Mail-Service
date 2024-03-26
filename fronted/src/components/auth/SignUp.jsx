import FormInput from "./FormInput";
import FormTitle from "./FormTitle";
import { RiUser3Fill, RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import FormButton from "./FormButton";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Axios from "axios";
import AuthError from "../modals/ResponseMessage";

const baseUrl = "http://localhost:3000";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUpForm = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const url = `${baseUrl}/api/user/signup`;
      const res = await Axios.post(url, { username, email, password });
      setError(res.data);
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setTimeout(() => {
        setError("");
        navigate("/auth/signin");
      }, 3000);

      console.log(res);
    } catch (error) {
      console.log(error.response.data);
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log(error);
    }
  };
  return (
    <>
      {/* {errorMessage && <AuthError errorMessage={errorMessage} />} */}
      <section className="absolute bg-slate-gray shadow-custom-shadow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-8 py-10 rounded-lg w-[23rem]">
        <FormTitle value="SIGN UP" />
        {error && <AuthError errorMessage={error} />}
        <form>
          <FormInput
            type="text"
            name="name"
            Icon={RiUser3Fill}
            placeholder="Username"
            ref={usernameRef}
          />
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
          <FormButton value="SIGN UP" onClick={handleSignUpForm} />
        </form>
        <div className="text-center text-lg p-2 mt-12 text-fourthColor flex justify-between">
          Already have an account ?{" "}
          <Link to="/auth/signin" className="text-firstColor ">
            SignIn
          </Link>
        </div>
      </section>
    </>
  );
};

export default SignUp;
