const FormButton = ({ value, onClick }) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <button
        className="text-center py-2 px-6 text-xl rounded-md border-2 hover:bg-slate-800 transition duration-300 ease-in-out"
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

export default FormButton;
