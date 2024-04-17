import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SpecialLink = ({ to, label, Icon, onClick }) => {
  const totalUnreadMails = useSelector((state) => state.mail.totalUnreadMails);
  return (
    <li
      className="bg-inherit p-2 px-8 rounded-lg flex space-x-3 items-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-black"
      onClick={onClick}
    >
      {Icon && <Icon className="text-white text-xl" />}
      <NavLink to={to} className="text-white text-xl">
        {label}
      </NavLink>
      {label === "inbox" && totalUnreadMails > 0 && (
        <div className="h-7 w-7 rounded-md bg-white text-black text-lg font-bold flex justify-center items-center">
          {totalUnreadMails}
        </div>
      )}
    </li>
  );
};

export default SpecialLink;
