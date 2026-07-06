
import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">
                    MyApp
                </h1>

                <div className="flex gap-6 text-gray-700 font-medium">
                    <Link to="/"> <button className="hover:text-blue-500">Home</button></Link>
                    <Link to="/about">  <button className="hover:text-blue-500">About</button></Link>
                    <Link to="/services">  <button className="hover:text-blue-500">Services</button></Link>
                    <Link to="/contact"> <button className="hover:text-blue-500">Contact</button></Link>

                    <Link to="/my-user"> <button className="hover:text-blue-500">MyUser</button></Link>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-24 px-6">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    Welcome to Home Page
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mb-8">
                    This is a dummy homepage created using React and Tailwind CSS.
                    You can customize this page according to your project needs.
                </p>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg">
                    Get Started
                </button>
            </section>

            {/* Cards Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16">

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                        Fast Development
                    </h2>

                    <p className="text-gray-600">
                        Build responsive and modern UI quickly using Tailwind CSS.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                        Responsive Design
                    </h2>

                    <p className="text-gray-600">
                        Mobile, tablet, and desktop friendly layouts with ease.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                        Reusable Components
                    </h2>

                    <p className="text-gray-600">
                        Create reusable UI components for scalable applications.
                    </p>
                </div>

            </section>

            {/* Footer */}
            <footer className="bg-white border-t py-4 text-center text-gray-500">
                © 2026 MyApp. All rights reserved.
            </footer>

        </div>
    );
};

export default HomePage;

