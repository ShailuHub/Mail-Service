import JoditEditor from "jodit-react";
import MailForm from "./MailForm";

const MailEditor = () => {
  const editorConfig = {
    toolbarAdaptive: true, // Disables the adaptive toolbar
    toolbarButtonSize: "large", // Sets the size of toolbar buttons to large
    language: "en", // Sets the language of the editor to English
  };
  return (
    <>
      <MailForm />
      <div className="max-w-screen-lg mx-auto">
        <JoditEditor config={editorConfig} />
      </div>
    </>
  );
};

export default MailEditor;
