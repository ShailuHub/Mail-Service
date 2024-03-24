// import { VscAccount, VscSearch } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../../store/store";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = () => {
    dispatch(authAction.signOut());
    navigate("/auth/signin");
  };

  return (
    <header className="h-20 w-full bg-black ">
      <nav className="flex justify-between items-center max-w-screen-wide mx-auto h-20 pr-8 pl-4">
        <div className="flex items-center">
          <div className="w-full h-full p-2 rounded-lg text-xl bg-white text-black font-extrabold">
            M
          </div>
          <div className="font-extrabold py-2 px-1 text-xl">ailBox</div>
        </div>
        {!isLoggedIn ? (
          <div className="flex space-x-2 justify-between items-center">
            <div className="text-firstColor text-xl">
              <Link to="/auth/signup">SignUp</Link>
            </div>
            <div className="text-xl text-fourthColor">|</div>
            <div className="py-2 px-1 text-xl">
              <Link to="/auth/signin">SignIn</Link>
            </div>
          </div>
        ) : (
          <div className="flex space-x-5 justify-between items-center">
            <div>
              Welcome <span className="text-firstColor">{user.username}</span>
            </div>
            <div className="text-xl text-fourthColor">|</div>
            <div className="text-red-500 text-xl">
              <button onClick={handleSignOut}>SignOut</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
