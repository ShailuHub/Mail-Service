import { VscAccount, VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="h-20 w-full bg-black ">
      <nav className="flex justify-between items-center max-w-screen-wide mx-auto h-20 pr-8 pl-4">
        <div className="flex items-center">
          <div className="w-full h-full p-2 rounded-lg text-xl bg-white text-black font-extrabold">
            M
          </div>
          <div className="font-extrabold py-2 px-1 text-xl">ailBox</div>
        </div>
        {/* <div className="flex space-x-2 justify-between items-center">
          <div className="relative">
            <input
              type="search"
              className=" text-lg outline-none pl-10 pr-4 py-1 rounded-md text-black"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <VscSearch className="text-lg text-gray-500" />
            </div>
          </div>
          <VscAccount className="text-4xl" />
        </div> */}
        <div className="flex space-x-2 justify-between items-center">
          <div className="text-firstColor text-xl">
            <Link to="/auth/signup">SignUp</Link>
          </div>
          <div className="text-xl text-fourthColor">|</div>
          <div className="py-2 px-1 text-xl">
            <Link to="/auth/signin">SignIn</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
