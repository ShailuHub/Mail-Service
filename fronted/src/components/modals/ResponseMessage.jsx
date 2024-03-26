import { createPortal } from "react-dom";
import { FaRegSquareCheck } from "react-icons/fa6";

const portalElement = document.getElementById("overlays");
const ErrorOverlays = (props) => {
  const error = props.errorMessage;
  return (
    <>
      <div className="bg-slate-gray p-2 px-3 border-2 absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-between space-x-4 rounded-md transition-all duration-500 ease-in-out">
        <div>
          <FaRegSquareCheck className="text-2xl text-firstColor" />
        </div>
        <div className="text-firstColor text-lg">{error}</div>
      </div>
    </>
  );
};
const ResponseMessage = (props) => {
  return (
    <>
      {createPortal(
        <ErrorOverlays errorMessage={props.errorMessage}>
          {props.children}
        </ErrorOverlays>,
        portalElement
      )}
    </>
  );
};

export default ResponseMessage;
