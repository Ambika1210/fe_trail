

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">

            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-600 mb-4">
                        Contact Us
                    </h1>

                    <p className="text-gray-600 text-lg">
                        Feel free to contact us anytime.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Message
                        </label>

                        <textarea
                            rows="5"
                            placeholder="Write your message..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-medium transition"
                    >
                        Send Message
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ContactPage;

