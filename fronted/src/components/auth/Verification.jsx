import FormButton from "./FormButton";

const otp = ["1", "2", "3", "4", "5", "6"];

const Verification = () => {
  return (
    <section className="absolute bg-slate-gray shadow-custom-shadow top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-2 py-2 rounded-lg w-[25rem]">
      <div className="p-5  ">
        <p className="text-xl font-light text-center text-firstColor ">
          Please enter the otp to verify Account
        </p>
        <p className="text-md font-light text-center text-fourthColor mt-3">
          OTP has been sent to your @email
        </p>
        <div className="flex space-x-2 items-center justify-center mt-10">
          {otp.map((value, idx) => {
            return (
              <input
                key={idx}
                type="number"
                className="w-12 h-12 border border-fourthColor bg-transparent outline-none text-center rounded-md focus:border-white transition duration-300 ease-in-out"
              />
            );
          })}
        </div>

        <FormButton value="Verify OTP" />
      </div>
    </section>
  );
};

export default Verification;
