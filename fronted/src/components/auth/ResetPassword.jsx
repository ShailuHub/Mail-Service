import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import { AiOutlineMail } from "react-icons/ai";
import FormButton from "./FormButton";

const ResetPassword = () => {
  return (
    <section className="absolute bg-slate-gray shadow-custom-shadow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-2 py-2 rounded-lg w-[25rem]">
      <div className="p-12 space-y-10 ">
        <FormTitle value="Please Enter Your Email" />
        <form>
          <FormInput
            type="email"
            name="email"
            id="email"
            label="Email"
            Icon={AiOutlineMail}
            placeholder="Email"
          />
          <FormButton value="Send Reset Link" />
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
