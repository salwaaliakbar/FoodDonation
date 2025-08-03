import React, { useState, useEffect } from "react";
import { Heart, Shield, X, Cookie } from "lucide-react";

// Food donation themed cookie banner with decent refinements
const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has made a choice in this session
    const cookieConsent = localStorage.getItem("cookieConsent");
    const sessionShown = sessionStorage.getItem("bannerShown");

    // Show banner only if no previous consent and not shown this session
    if (!cookieConsent && !sessionShown) {
      setShowBanner(true);
      sessionStorage.setItem("bannerShown", "true");
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("cookieConsent", "essential");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Softer backdrop */}
      <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-50 to-green-50 border-t-2 border-green-700 shadow-xl z-50 transform transition-transform duration-300">
        <div className="max-w-6xl mx-auto py-6 px-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                Your Privacy Matters
                <Cookie className="w-4 h-4 text-green-800" />
              </h3>

              <p className="text-green-800 text-sm mb-4 leading-relaxed">
                Just like we care about feeding those in need, we care about
                protecting your data. We use essential cookies to keep your
                account secure and ensure safe donations.
              </p>

              {showDetails && (
                <div className="bg-white/80 rounded-lg p-4 mb-4 border border-green-200 shadow-sm">
                  <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-700" />
                    Essential Cookies
                  </h4>
                  <ul className="text-green-800 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-800 mt-0.5">•</span>
                      <span>
                        <strong>Authentication:</strong> Keeps you logged in
                        securely
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-800 mt-0.5">•</span>
                      <span>
                        <strong>Session Management:</strong> Maintains seamless
                        experience
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-800 mt-0.5">•</span>
                      <span>
                        <strong>Security:</strong> Protects your data from
                        unauthorized access
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 p-3 bg-green-50 rounded border-l-3 border-green-500">
                    <p className="text-green-700 text-sm">
                      These cookies are essential for platform security and
                      cannot be disabled.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="bg-green-800 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm shadow-md cursor-pointer"
                >
                  Accept & Continue
                </button>

                <button
                  onClick={handleEssentialOnly}
                  className="bg-white hover:bg-green-50 text-green-800 px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm border border-green-700 cursor-pointer"
                >
                  Essential Only
                </button>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-green-800 hover:text-green-700 text-sm font-medium hover:underline transition-colors duration-200 cursor-pointer"
                >
                  {showDetails ? "Hide Details" : "View Details"}
                </button>
              </div>

              <p className="text-xs text-green-800 mt-3 bg-green-50/70 rounded p-2 border-l-2 border-green-800">
                <strong>Note:</strong> Continuing to use our platform means you
                agree to essential cookie usage for security.
              </p>
            </div>

            <button
              onClick={handleReject}
              className="flex-shrink-0 p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors duration-200"
              title="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className="h-0.5 bg-gradient-to-r from-green-600 to-green-700"></div>
      </div>
    </>
  );
};

export default CookieBanner;
