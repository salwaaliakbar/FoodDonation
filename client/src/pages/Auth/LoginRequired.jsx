import { Link } from "react-router-dom";

function LoginRequired() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-brand-700 text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 mb-2">Login Required</h2>
          <p className="text-stone-600">
            You need to be logged in to access this page. Please login or sign up to continue.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            Go to Home Page
          </Link>

          <p className="text-sm text-stone-500">
            Click the "Login/Signup" button in the navigation bar to access your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginRequired; 