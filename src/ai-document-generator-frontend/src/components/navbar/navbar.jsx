import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  let menuAktive = show ? "right-0" : "-right-full"; // posisi menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScroll(true);
        if (show) setShow(false); // auto close pas scroll
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [show]);

  let scrollActive = scroll ? "py-6 text-white bg-black shadow" : "py-4 ";

  return (
    <div className={`navbar fixed w-full transition-all ${scrollActive} z-50`}>
      <div className="container mx-auto px-4">
        <div className="navbarbox flex items-center justify-between">
          {/* Logo */}
          <div className="logo">
            <h1
              className={`text-xl font-bold ${
                scroll ? "text-white" : "text-white"
              }`}
            >
              AI-DOC-CHAIN
            </h1>
          </div>

          {/* Menu */}
          <ul
            className={`flex lg:gap-8 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 ${
              scroll ? "md:text-white" : "md:text-white"
            } gap-6 fixed ${menuAktive} top-0 w-3/4 h-full flex-col py-6 rounded-l-lg shadow-lg bg-black font-bold text-white 
            transition-all duration-300 text-sm  z-40`}
          >
            <li className="font-bold opacity-90 hover:opacity-100 px-3 py-1">
              <a href="#home" className="block">
                Beranda
              </a>
            </li>
            <li className="font-bold opacity-90 hover:opacity-100 px-3 py-1">
              <a href="#about" className="block">
                Tentang Kami
              </a>
            </li>
            <li className="font-bold opacity-90 hover:opacity-100 px-3 py-1">
              <a href="#services" className="block">
                Layanan
              </a>
            </li>
            <li className="font-bold opacity-90 hover:opacity-100 px-3 py-1">
              <a href="#team" className="block">
                Team
              </a>
            </li>
          </ul>

          {/* Sosial Media */}
          <div
            className={`sosial hidden md:flex items-center gap-2 ${
              scroll ? "text-black" : "text-white"
            }`}
          >
            <a
              href=""
              className="px-3 py-3 rounded-xl  text-white font-semibold transition"
            >
              Login <i class="ri-login-box-line text-white text-2xl"></i>
            </a>
          </div>

          <i
            className={`${
              show ? "ri-close-line" : "ri-menu-3-line"
            } text-2xl md:hidden block cursor-pointer ${
              scroll ? "text-black" : "text-white"
            } z-50`}
            onClick={handleClick}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
