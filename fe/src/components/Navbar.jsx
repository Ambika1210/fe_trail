
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm px-8 h-16 flex justify-between items-center">

            {/* Logo */}
            <h1 className="!text-lg font-semibold text-blue-600 leading-none m-0 p-0 cursor-pointer">
                MyApp
            </h1>

            {/* Nav Links */}
            <div className="flex items-center gap-8 text-sm font-medium text-gray-700">

                <Link
                    to="/"
                    className="hover:text-blue-500 transition duration-200"
                >
                    Home
                </Link>

                <Link
                    to="/about"
                    className="hover:text-blue-500 transition duration-200"
                >
                    About
                </Link>

                <Link
                    to="/services"
                    className="hover:text-blue-500 transition duration-200"
                >
                    Services
                </Link>

                <Link
                    to="/contact"
                    className="hover:text-blue-500 transition duration-200"
                >
                    Contact
                </Link>

                <Link
                    to="/my-user"
                    className="hover:text-blue-500 transition duration-200"
                >
                    MyUser
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;

