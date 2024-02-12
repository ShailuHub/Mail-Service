import { forwardRef } from "react";
// Forward Ref from child to parent component forwardRef takes two arguments
const FormInput = forwardRef(({ type, name, placeholder, Icon }, ref) => {
  return (
    <div className="flex flex-col space-y-2 mb-3">
      <div className="flex justify-start items-center space-x-1 border-b-2 px-2">
        {Icon && <Icon className="text-xl text-white" />}
        <input
          type={type}
          name={name}
          className="rounded bg-inherit text-lg px-3 py-2 outline-none text-white w-full"
          placeholder={placeholder}
          ref={ref} // Forwarding ref to the input element
        />
      </div>
    </div>
  );
});

//Es lint shows error it has no effect on the functionality
FormInput.displayName = "FormInput"; // Assigning displayName

export default FormInput;
