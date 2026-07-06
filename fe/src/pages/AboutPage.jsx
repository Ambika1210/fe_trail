

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full">

                <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
                    About Us
                </h1>

                <p className="text-gray-700 text-lg leading-8 mb-4">
                    Welcome to our application. This is a dummy About page created
                    using React and Tailwind CSS.
                </p>

                <p className="text-gray-700 text-lg leading-8 mb-4">
                    Our goal is to build modern, responsive, and scalable web
                    applications with clean UI and smooth user experience.
                </p>

                <p className="text-gray-700 text-lg leading-8">
                    Technologies used in this project include React.js,
                    Tailwind CSS, React Router DOM, and Axios.
                </p>

                <div className="mt-8 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Learn More
                    </button>
                </div>

            </div>

        </div>
    );
};

export default AboutPage;

