import { TfiWrite } from "react-icons/tfi";

const ComposeMail = ({ onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="flex items-center justify-center bg-firstColor p-4 text-black space-x-3 rounded-xl font-extrabold ml-4 cursor-pointer"
      >
        <TfiWrite className="text-lg text-black" />
        <h2>COMPOSE</h2>
      </div>
    </>
  );
};

export default ComposeMail;
