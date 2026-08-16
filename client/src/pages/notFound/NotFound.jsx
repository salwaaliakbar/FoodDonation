import { Link } from 'react-router-dom';

function NotFound(){
    return (
        <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
            <div className="max-w-xl mx-auto text-center shadow-2xl rounded-2xl bg-white p-10 border border-stone-200">
                {/* Icon and 404 heading */}
                <div className="flex flex-col items-center mb-4">
                    {/* Animated SVG icon */}
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="mb-4 animate-bounce">
                        <circle cx="12" cy="12" r="10" className="fill-brand-500" opacity="0.15"/>
                        <path d="M8 12h8M12 8v8" className="stroke-brand-700" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    {/* 404 error code */}
                    <h1 className="text-7xl font-extrabold text-brand-800 mb-1">404</h1>
                </div>
                {/* Error message and description */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-stone-900 mb-2">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-stone-600 text-base leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.<br/>
                        Let's get you back to something delicious!
                    </p>
                </div>
                {/* Button to return to home page */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;