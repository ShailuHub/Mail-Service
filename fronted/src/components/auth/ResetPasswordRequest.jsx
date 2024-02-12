import FormInput from "./FormInput";
import FormTitle from "./FormTitle";
import FormButton from "./FormButton";
import { RiLockPasswordFill } from "react-icons/ri";

const ResetPasswordRequest = () => {
  return (
    <section className="absolute bg-slate-gray shadow-custom-shadow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-12 py-12 rounded-lg ">
      <FormTitle value="Enter New Password" />
      <form>
        <FormInput
          type="password"
          name="password"
          Icon={RiLockPasswordFill}
          placeholder="new password"
        />
        <FormInput
          type="password"
          name="cnf_password"
          Icon={RiLockPasswordFill}
          placeholder="confirm password"
        />
        <FormButton value="Reset Password" />
      </form>
    </section>
  );
};

export default ResetPasswordRequest;
