import { NavLink } from "react-router-dom";

const SpecialLink = ({ to, label, Icon, onClick }) => {
  return (
    <li
      className="bg-inherit p-2 px-8 rounded-lg flex space-x-3 items-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-black"
      onClick={onClick}
    >
      {Icon && <Icon className="text-white text-xl" />}
      <NavLink
        to={to}
        className="text-white text-xl"
        activeClassName="active-link"
      >
        {label}
      </NavLink>
    </li>
  );
};

export default SpecialLink;
