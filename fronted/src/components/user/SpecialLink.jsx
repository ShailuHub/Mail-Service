function SpecialLink({ href, label, Icon }) {
  return (
    <li className="bg-inherit p-2 px-8 rounded-lg flex space-x-3 items-center cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-black">
      {Icon && <Icon className="text-white text-xl" />}
      <a href={href} className="text-white text-xl">
        {label}
      </a>
    </li>
  );
}

export default SpecialLink;
