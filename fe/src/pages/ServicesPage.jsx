
const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-16 px-6">

            {/* Heading */}
            <div className="text-center mb-14">
                <h1 className="text-5xl font-bold text-blue-600 mb-4">
                    Our Services
                </h1>

                <p className="text-gray-600 text-lg">
                    Explore the services we provide for modern web applications.
                </p>
            </div>

            {/* Services Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">

                    <div className="text-5xl mb-5">
                        💻
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                        Web Development
                    </h2>

                    <p className="text-gray-600 leading-7">
                        We build fast, scalable, and responsive websites using modern
                        technologies like React and Tailwind CSS.
                    </p>

                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">

                    <div className="text-5xl mb-5">
                        📱
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                        Mobile Responsive Design
                    </h2>

                    <p className="text-gray-600 leading-7">
                        Our designs work perfectly across mobile, tablet, and desktop
                        devices with clean user experience.
                    </p>

                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">

                    <div className="text-5xl mb-5">
                        ☁️
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                        Cloud Integration
                    </h2>

                    <p className="text-gray-600 leading-7">
                        Integrate secure cloud services like AWS S3 for storage,
                        deployment, and scalable infrastructure.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default ServicesPage;

