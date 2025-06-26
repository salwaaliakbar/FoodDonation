import { Link } from 'react-router-dom';

function NotFound(){
    // Render the NotFound page UI
    return (
        // Full-screen container with gradient background and center alignment
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center px-4 font-[Montserrat]">
            {/* Card container with shadow, rounded corners, and padding */}
            <div className="max-w-xl mx-auto text-center shadow-2xl rounded-3xl bg-white/80 p-10 border border-green-200">
                {/* Icon and 404 heading */}
                <div className="flex flex-col items-center">
                    {/* Animated SVG icon */}
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mb-4 animate-bounce">
                        <circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.2"/>
                        <path d="M8 12h8M12 8v8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    {/* 404 error code */}
                    <h1 className="text-8xl font-extrabold text-green-800 drop-shadow-lg mb-2 font-[Poppins]">404</h1>
                </div>
                {/* Error message and description */}
                <div className="mt-2 mb-8">
                    <h2 className="text-3xl font-bold text-green-800 mb-2">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg">
                        The page you’re looking for doesn’t exist or has been moved.<br/>
                        Let’s get you back to something delicious!
                    </p>
                </div>
                {/* Button to return to home page */}
                <Link 
                    to="/"
                    className="px-8 py-3 bg-green-800 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-200 inline-block"
                >
                    🍽️ Return Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;