import JoditEditor from "jodit-react";
import MailForm from "./MailForm";
import { useRef, useState } from "react";
import { editorConfig } from "../../constants/mailbox";
import Axios from "axios";
import { baseUrl } from "../../constants/mailbox";
import ResponseMessage from "../modals/ResponseMessage";
import socket from "../../socket";

const MailEditor = ({ onCancel }) => {
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const toRef = useRef();
  const subjectRef = useRef();

  // Function to get plain text from HTML
  const getTextFromHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Handler function for sending mail
  const handleMailForm = async () => {
    try {
      const to = toRef.current.value;
      const subject = subjectRef.current.value;
      const body = getTextFromHtml(content);

      const mailData = {
        to,
        subject,
        body,
      };

      // socket.emit("newMail", { recipientId: to, newMail: { subject, body } });

      const url = `${baseUrl}/api/mail/send-mail?receiverEmail=${to}`;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const res = await Axios.post(url, mailData, {
        headers: { Authorization: token },
      });

      // Show success message
      setError(res.data);
      setTimeout(() => {
        setError("");
      }, 3000);

      // Clear form fields and editor content
      toRef.current.value = "";
      subjectRef.current.value = "";
      setContent("");
    } catch (error) {
      console.log(error);
      // Show error message if there's an error response
      if (error.response) {
        setError(error.response.data);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  return (
    <>
      {error && <ResponseMessage errorMessage={error} />}
      <div className="max-w-screen-lg mx-auto">
        <MailForm reference={{ toRef, subjectRef }} />
        <JoditEditor
          ref={editorRef}
          config={editorConfig}
          className="text-gray-700"
          value={content}
          onChange={(newContent) => setContent(newContent)}
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
