import { Link } from 'react-router-dom';

function NotFound(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 font-[Montserrat]">
            <div className="max-w-xl mx-auto text-center shadow-xl rounded-2xl bg-white p-8 border border-green-200">
                {/* Icon and 404 heading */}
                <div className="flex flex-col items-center mb-4">
                    {/* Animated SVG icon */}
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mb-4 animate-bounce">
                        <circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.2"/>
                        <path d="M8 12h8M12 8v8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    {/* 404 error code */}
                    <h1 className="text-6xl font-extrabold text-green-800 mb-1">404</h1>
                </div>
                {/* Error message and description */}
                <div className="mb-7">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.<br/>
                        Let's get you back to something delicious!
                    </p>
                </div>
                {/* Button to return to home page */}
                <Link 
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-800 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                >
                    <span>🏠</span>
                    Return Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;