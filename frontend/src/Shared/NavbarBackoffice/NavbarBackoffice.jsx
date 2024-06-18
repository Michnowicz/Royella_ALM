import { Link, NavLink } from "react-router-dom";
import useScrollPosition from "./useScrollPosition";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiChevronDown, BiSun } from "react-icons/bi";
import { IoMoonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";


const NavbarBackoffice = () => {
  // modal openar
  const [isOpen, setIsOpen] = useState(false);
  // dark mode toggle bar
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  // scrolling tracker
  const scrollPosition = useScrollPosition();
  // background color add and remover
  const navbarBgColor =
    scrollPosition > 100 ? "lg:bg-lightBlack" : "lg:bg-transparent";

  const navbarTextColor =
    scrollPosition > 100 ? "text-white dark:text-white" : "text-lightBlack dark:text-white";

  const navbarImage =
    scrollPosition > 100 ? "/images/home-4/logo-2.png" : "/images/home-4/logo.png";

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav
    className={` w-full lg:fixed font-Lora z-10  lg:px-5 lg:py-2  transition-all duration-300 ${navbarBgColor} `}
    >
      <div className="Container3 ">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* website Logo */}
          <div className=" w-48 lg:w-52 lg:p-4 hidden lg:block">
            <Link to="/">
              <img
                src={navbarImage}
                className="dark:hidden"
                alt="website_logo"
              />
              <img
                src="/images/home-4/logo-2.png"
                className=" hidden dark:block"
                alt="website_logo"
              />
            </Link>
          </div>

          {/* small screen size */}
          <div className="px-3 w-full lg:hidden flex justify-between items-center text-white bg-white dark:bg-lightBlack h-[70px] p-3">
            <div className=" w-28  ">
              <Link to="/">
                <img
                  src={navbarImage}
                  className="dark:hidden"
                  alt="website_logo"
                />
                <img
                  src="/images/home-4/logo-2.png"
                  className=" hidden dark:block"
                  alt="website_logo"
                />
              </Link>
            </div>

            {/* toggle bar and dark and light mode. */}
            <div className="flex items-center ">
              <span onClick={handleClick} className="mr-3 cursor-pointer">
                {isDarkMode ? (
                  <BiSun
                    className="text-lightBlack dark:text-white"
                    title="Apply Light Mode"
                    size={20}
                  />
                ) : (
                  <IoMoonSharp
                    size={20}
                    className="text-lightBlack dark:text-white"
                    title="Apply Dark Mode"
                  />
                )}
              </span>

              <button
                className="lg:hidden block focus:outline-none "
                onClick={toggleNavbar}
              >
                {/* modal open and close */}
                {isOpen ? (
                  <IoMdClose className="w-6 h-6  text-lightBlack dark:text-white" />
                ) : (
                  <FaBars className="w-5 h-5  text-lightBlack dark:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* All navLink are hear with active */}

          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } text-left w-full lg:w-fit  ease-in-out lg:flex space-y-2 lg:space-y-0 lg:text-center space-x-0 lg:space-x-3 xl:space-x-4 2xl:space-x-5 3xl:space-x-[24px]  flex items-center flex-col lg:flex-row text-sm text-lightBlack   uppercase font-normal bg-white dark:bg-normalBlack z-10 lg:bg-transparent dark:lg:bg-transparent py-3 lg:py-0 `}
          >
            <NavLink
              className={`${({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} ${navbarTextColor} hover:text-khaki dark:hover:text-khaki  lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative`}
              to="/backoffice"
            >
              <span className="flex items-center">
                Home
                <BiChevronDown className="ml-1" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[200px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/backoffice/banner" className="py-2 block">
                        Create Banner
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/backoffice/hotelresort" className="py-2 block">
                        Hotel & Resort
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/backoffice/manager" className="py-2 block">
                        Manager
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} ${navbarTextColor} hover:text-khaki dark:hover:text-khaki  lg:border-b-0 px-3 py-2 w-full block transition-all duration-300`}
              to="/backoffice/rooms"
            >
              ROOMS
            </NavLink>
            
            {/* large device visible button and search icon */}

            <div className="hidden lg:flex items-center ml-5">
              <span
                onClick={handleClick}
                className="mr-3 cursor-pointer group "
              >
                {isDarkMode ? (
                  <BiSun
                    className={`${navbarTextColor} dark:text-white hover:text-khaki dark:hover:text-khaki group-hover:rotate-90 rotate transition-all duration-300`}
                    title="Apply Light Mode"
                    size={35}
                  />
                ) : (
                  <IoMoonSharp
                    className={`${navbarTextColor} hover:text-khaki dark:hover:text-khaki group-hover:rotate-[360deg] transition-all duration-300`}
                    title="Apply Dark Mode"
                    size={35}
                  />
                )}
              </span>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarBackoffice;
