
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-8 h-32 flex justify-between items-center">

                {/* Left */}
                <div className="max-w-xs">

                    <h1 className="text-lg font-semibold text-blue-500">
                        MyApp
                    </h1>

                    <p className="text-gray-400 text-xs mt-2 leading-5">
                        Build modern and responsive web applications.
                    </p>

                </div>

                {/* Center */}
                <div className="flex flex-col gap-1 text-xs text-gray-400">

                    <h2 className="text-sm font-semibold text-white mb-1">
                        Links
                    </h2>

                    <Link to="/" className="hover:text-white">
                        Home
                    </Link>

                    <Link to="/about" className="hover:text-white">
                        About
                    </Link>

                    <Link to="/services" className="hover:text-white">
                        Services
                    </Link>

                </div>

                {/* Right */}
                <div className="text-xs text-gray-400 flex flex-col gap-1">

                    <h2 className="text-sm font-semibold text-white mb-1">
                        Contact
                    </h2>

                    <p>support@myapp.com</p>

                    <p>+91 9876543210</p>

                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 py-2 text-center text-xs text-gray-500">
                © 2026 MyApp. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;

