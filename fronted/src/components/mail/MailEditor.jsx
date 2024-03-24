import JoditEditor from "jodit-react";
import MailForm from "./MailForm";
import { useRef } from "react";
import { editorConfig } from "../../constants/mailbox";
import Axios from "axios";
import { baseUrl } from "../../constants/mailbox";

const MailEditor = ({ onCancel }) => {
  const editorRef = useRef();
  const toRef = useRef();
  const subjectRef = useRef();

  const handleMailForm = async () => {
    const to = toRef.current.value;
    const subject = subjectRef.current.value;
    const body = editorRef.current.value;

    const mailData = {
      to,
      subject,
      body,
    };
    const url = `${baseUrl}/api/mail/send-mail?receiverEmail=${to}`;
    const { token } = JSON.parse(localStorage.getItem("user"));
    const res = await Axios.post(url, mailData, {
      headers: { Authorization: token },
    });
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <MailForm reference={{ toRef, subjectRef }} />
        <JoditEditor
          ref={editorRef}
          config={editorConfig}
          className="text-gray-700"
        />
        <div className="flex justify-center space-x-4 mt-4">
          <button className="text-center  py-2 px-6 text-xl rounded-md border-2 hover:bg-slate-800 transition duration-300 ease-in-out hover:text-white">
            Save
          </button>
          <button
            onClick={handleMailForm}
            className="text-center bg-firstColor text-black  py-2 px-6 text-xl rounded-md border-2 hover:bg-slate-800 transition duration-300 ease-in-out hover:text-white"
          >
            Send
          </button>
          <button
            className="text-center bg-red-500 py-2 px-6 text-xl rounded-md border-2 hover:bg-slate-800 transition duration-300 ease-in-out"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MailEditor;
