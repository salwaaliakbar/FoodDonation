import { Link } from "react-router-dom";

function LoginRequired() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-600 text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600">
            You need to be logged in to access this page. Please login or sign up to continue.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-green-800 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            Go to Home Page
          </Link>
          
          <p className="text-sm text-gray-500">
            Click the "Login/Signup" button in the navigation bar to access your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginRequired; 