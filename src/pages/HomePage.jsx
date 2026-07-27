import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    // State for Feature Tabs Showcase
    const [activeTab, setActiveTab] = useState("developer");

    // State for FAQ Accordion
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const tabsData = {
        developer: {
            title: "Developer First Tools",
            description: "Equipped with hot-reloading, comprehensive CLI tools, and seamless environment configs, our platform gives developers everything they need to start building immediately.",
            badge: "DevOps Enabled",
            features: [
                "Instant local live preview",
                "Built-in error tracing and logs",
                "Git integration & automatic branching",
            ],
            color: "from-blue-600 to-indigo-600"
        },
        security: {
            title: "Bank-Grade Secure Authentication",
            description: "Protect your users with MFA, biometric passkeys, and advanced encryption methods. Fully compliant with modern privacy frameworks and GDPR requirements.",
            badge: "OAuth & JWT Support",
            features: [
                "Two-factor authentication (2FA)",
                "Session management & anomaly alerts",
                "End-to-end data encryption",
            ],
            color: "from-emerald-600 to-teal-600"
        },
        analytics: {
            title: "Real-Time User Analytics Dashboard",
            description: "Gain deeper insights into user interaction, page performance, and custom events. Make data-driven decisions with rich dashboards updated in real time.",
            badge: "Live Telemetry",
            features: [
                "Granular event-tracking pipelines",
                "Highly detailed latency profiling",
                "Custom chart export capabilities",
            ],
            color: "from-purple-600 to-pink-600"
        }
    };

    const faqs = [
        {
            q: "How do I get started with MyApp?",
            a: "Simply click the 'Get Started' button in the hero section, sign up for a free account, and configure your first API credentials within minutes."
        },
        {
            q: "Does this platform support mobile integrations?",
            a: "Yes! All components are designed with mobile responsiveness at their core, and our backend client libraries support React Native, Swift, and Android SDKs."
        },
        {
            q: "Is there a limit on how many users we can create?",
            a: "The Starter tier allows up to 100 active user profiles. Our Pro and Enterprise tiers scale up to millions of users with full high-availability support."
        },
        {
            q: "How secure is the custom user metadata?",
            a: "Every single piece of user data is encrypted both at rest and in transit. We use standard AES-256 encryption protocols and support custom encryption keys for Enterprise clients."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white">

            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 py-24 md:py-32 px-6">
                {/* Background decorative blob */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-r from-blue-200/30 to-purple-200/30 blur-3xl -z-10 rounded-full" />

                <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
                    {/* Glowing Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-blue-600 mb-8 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                        Explore Our Brand New Features
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl">
                        Build Smarter Apps <br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            In Record Time
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed">
                        Say goodbye to boilerplate backend setups and poorly formatted frontend designs.
                        Utilize our customizable React components, built-in analytics, and ultra-secure APIs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link to='/login'>  <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                            Get Started Free
                        </button></Link>
                        <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-medium px-8 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                            Watch Demo Video
                        </button>
                    </div>
                </div>
            </section>


            {/* 2. Stats Section */}
            <section className="py-12 bg-white border-y border-slate-100 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-2">99.99%</div>
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Platform Uptime</div>
                        <p className="text-xs text-slate-400 mt-2">Guaranteed high-availability SLA</p>
                    </div>
                    <div className="p-6 border-y md:border-y-0 md:border-x border-slate-100">
                        <div className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-2">15,000+</div>
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Developers</div>
                        <p className="text-xs text-slate-400 mt-2">Creating applications daily worldwide</p>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl sm:text-5xl font-extrabold text-purple-600 mb-2">&lt; 150ms</div>
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Average API Latency</div>
                        <p className="text-xs text-slate-400 mt-2">Optimized content delivery networks</p>
                    </div>
                </div>
            </section>


            {/* 3. Core Features (Improved Cards) */}
            <section className="py-24 bg-slate-50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Engineered for Modern Web Workflows
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Get fully responsive layouts, scalable API bindings, and ready-to-use boilerplate.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                                Fast Development
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Build responsive and modern user interfaces quickly using utility classes and reusable JSX layouts.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                                Responsive Design
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Seamless layouts designed to scale beautifully from the smallest mobile device up to massive 4K desktop screens.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-purple-600 transition-colors">
                                Reusable Components
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Fully functional form configurations, modals, navigation layers, and details cards ready to copy and paste.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. Interactive Showcase Section */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Interactive Features Showcase
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Switch tabs to explore what makes our workspace modules performant and developer-friendly.
                        </p>
                    </div>

                    {/* Tabs navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <button
                            onClick={() => setActiveTab("developer")}
                            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${activeTab === "developer"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                                }`}
                        >
                            🧑‍💻 Developer Tools
                        </button>
                        <button
                            onClick={() => setActiveTab("security")}
                            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${activeTab === "security"
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/10"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                                }`}
                        >
                            🛡️ Bank Security
                        </button>
                        <button
                            onClick={() => setActiveTab("analytics")}
                            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${activeTab === "analytics"
                                ? "bg-purple-600 text-white shadow-md shadow-purple-500/10"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                                }`}
                        >
                            📈 Live Analytics
                        </button>
                    </div>

                    {/* Tab content panel */}
                    <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-inner grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-start">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 mb-4 shadow-sm">
                                {tabsData[activeTab].badge}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                                {tabsData[activeTab].title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {tabsData[activeTab].description}
                            </p>

                            <ul className="space-y-3">
                                {tabsData[activeTab].features.map((feat, idx) => (
                                    <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Illustrative interactive visual box */}
                        <div className="h-64 sm:h-80 w-full rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 p-6 text-white font-mono text-sm relative overflow-hidden shadow-xl">
                            {/* Colorful glow reflection */}
                            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${tabsData[activeTab].color} blur-3xl opacity-40 rounded-full`} />

                            <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-4">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-xs text-slate-500 ml-2 font-sans select-none">terminal_demo.js</span>
                            </div>

                            {activeTab === "developer" && (
                                <div className="space-y-2">
                                    <p className="text-slate-500">// Initialize instant application reload</p>
                                    <p className="text-green-400">$ npm run dev</p>
                                    <p className="text-slate-300">✓ Vite Dev Server started in 73ms</p>
                                    <p className="text-slate-300">✓ Hot module replacement (HMR) ready</p>
                                    <p className="text-blue-400">➜ Local: http://localhost:5173/</p>
                                    <p className="text-yellow-400 animate-pulse">&gt; components/UserAddress.js saved. Updating live...</p>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-2">
                                    <p className="text-slate-500">// Auth transaction log verify</p>
                                    <p className="text-emerald-400">$ verify-auth --user="akjha@company.com"</p>
                                    <p className="text-slate-300">✓ JWT Public RSA Key downloaded</p>
                                    <p className="text-slate-300">✓ Biometric Fingerprint matches User-Key</p>
                                    <p className="text-emerald-400">✓ Verification Successful (200 OK)</p>
                                    <p className="text-indigo-400">Session expires in 3600 seconds</p>
                                </div>
                            )}

                            {activeTab === "analytics" && (
                                <div className="space-y-2">
                                    <p className="text-slate-500">// Real-time dashboard telemetry logs</p>
                                    <p className="text-purple-400">⚡ Event trigger: "ButtonClick_GetStarted"</p>
                                    <p className="text-slate-300">✓ Log queue: [IP: 103.52.xx.x] [Region: IN-DL]</p>
                                    <p className="text-slate-300">✓ API load latency: 42ms</p>
                                    <p className="text-pink-400">✓ Active concurrent dashboard connections: 4,891</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>


            {/* 5. Pricing Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-100 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Transparent Pricing Plans
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Choose the plan that suits your scope. Scale up or down as your user base evolves.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {/* Plan 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Starter</h3>
                                <p className="text-slate-500 text-sm mb-6">Perfect for side projects and learning React backend bindings.</p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-extrabold text-slate-900">$0</span>
                                    <span className="text-slate-500 text-sm">/ month</span>
                                </div>
                                <ul className="space-y-3.5 text-sm text-slate-600">
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 100 User Addresses</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Basic UI Components</li>
                                    <li className="flex items-center gap-2 text-slate-400"><span className="text-slate-300">✗</span> Advanced analytics</li>
                                    <li className="flex items-center gap-2 text-slate-400"><span className="text-slate-300">✗</span> 24/7 Priority support</li>
                                </ul>
                            </div>
                            <button className="w-full mt-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-colors cursor-pointer">
                                Start Free Trial
                            </button>
                        </div>

                        {/* Plan 2 */}
                        <div className="bg-white p-8 rounded-3xl border-2 border-blue-500 shadow-md relative flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Pro Team</h3>
                                <p className="text-slate-500 text-sm mb-6">Designed for expanding businesses needing analytics and security.</p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-extrabold text-slate-900">$29</span>
                                    <span className="text-slate-500 text-sm">/ month</span>
                                </div>
                                <ul className="space-y-3.5 text-sm text-slate-600">
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Unlimited Addresses</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> All Premium Layout Modules</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 5 Days Analytics logs</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Email support within 8 hours</li>
                                </ul>
                            </div>
                            <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/10 cursor-pointer">
                                Upgrade to Pro
                            </button>
                        </div>

                        {/* Plan 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise</h3>
                                <p className="text-slate-500 text-sm mb-6">Tailored solutions for massive companies with custom security setups.</p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-extrabold text-slate-900">$99</span>
                                    <span className="text-slate-500 text-sm">/ month</span>
                                </div>
                                <ul className="space-y-3.5 text-sm text-slate-600">
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> High-availability dedicated nodes</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Biometric Authentication</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Complete Analytics Telemetry</li>
                                    <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 24/7 Dedicated account manager</li>
                                </ul>
                            </div>
                            <button className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer">
                                Contact Enterprise
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* 6. Testimonials Grid */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Loved by Leading Developers
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Read what developers and engineers are saying about their workspace integrations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="flex text-yellow-400 gap-1 mb-4">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-6 italic">
                                "The response times of the address APIs are incredible. It took me less than an hour to set up address schemas and connect them directly to my client forms."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                    RD
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Rahul Deshmukh</h4>
                                    <p className="text-xs text-slate-500">Senior Frontend Engineer</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="flex text-yellow-400 gap-1 mb-4">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-6 italic">
                                "I love the clean styling presets and the responsive features. My website renders flawlessly on iPhones, tablets, and 4k screens automatically."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                                    AP
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Anjali Patel</h4>
                                    <p className="text-xs text-slate-500">UI/UX Consultant</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="flex text-yellow-400 gap-1 mb-4">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-6 italic">
                                "Security and GDPR rules are a high priority for us. With the built-in MFA patterns and simple token configs, we deployed safely on day one."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                                    JS
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Jérôme S.</h4>
                                    <p className="text-xs text-slate-500">DevOps Architect</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 7. Frequently Asked Questions (Accordion) */}
            <section className="py-24 bg-slate-50 border-t border-slate-100 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-slate-600">
                            Got questions? We've got answers. Click on a question to learn more.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm transition-all"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50/50 transition-colors cursor-pointer"
                                    >
                                        <span>{faq.q}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* Expanded answer element */}
                                    <div
                                        className={`transition-all duration-200 ease-in-out ${isOpen ? "max-h-48 border-t border-slate-100" : "max-h-0"
                                            } overflow-hidden`}
                                    >
                                        <div className="p-6 text-slate-600 leading-relaxed text-sm bg-slate-50/20">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* 8. Call to Action (CTA) Banner */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/10">
                    {/* Background glowing rings */}
                    <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-2xl" />

                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8 relative z-10">
                        Join over 15,000 active developers building and testing dynamic interfaces. Set up your account for free.
                    </p>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10"
                    >
                        <input
                            type="email"
                            placeholder="Enter your professional email"
                            className="flex-grow px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder-blue-200 outline-none focus:border-white focus:ring-2 focus:ring-white/20 text-sm transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-white hover:bg-slate-100 text-blue-600 font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
