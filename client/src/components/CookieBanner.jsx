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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-stone-900 mb-2 flex items-center gap-2">
            Your Privacy Matters
            <Cookie className="w-4 h-4 text-brand-700" />
          </h3>

          <p className="text-stone-600 text-sm mb-3 leading-relaxed">
            Just like we care about feeding those in need, we care about
            protecting your data. We use essential cookies to keep your
            account secure and ensure safe donations.
          </p>

          {showDetails && (
            <div className="bg-cream-50 rounded-xl p-4 mb-4 border border-stone-200">
              <h4 className="font-semibold text-stone-900 mb-3 flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-brand-700" />
                Essential Cookies
              </h4>
              <ul className="text-stone-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-brand-700 mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-800">Authentication:</strong> Keeps you logged in
                    securely
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-700 mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-800">Session Management:</strong> Maintains seamless
                    experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-700 mt-0.5">•</span>
                  <span>
                    <strong className="text-stone-800">Security:</strong> Protects your data from
                    unauthorized access
                  </span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-brand-50 rounded-lg border-l-2 border-brand-500">
                <p className="text-stone-600 text-xs">
                  These cookies are essential for platform security and
                  cannot be disabled.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              onClick={handleAcceptAll}
              className="bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200 text-sm cursor-pointer"
            >
              Accept & Continue
            </button>

            <button
              onClick={handleEssentialOnly}
              className="text-brand-700 hover:text-brand-800 font-medium hover:underline text-sm cursor-pointer"
            >
              Essential Only
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-stone-500 hover:text-stone-700 text-sm font-medium hover:underline transition-colors duration-200 cursor-pointer"
            >
              {showDetails ? "Hide Details" : "View Details"}
            </button>
          </div>

          <p className="text-xs text-stone-500 mt-3 bg-cream-50 rounded-lg p-2 border-l-2 border-brand-700">
            <strong className="text-stone-700">Note:</strong> Continuing to use our platform means you
            agree to essential cookie usage for security.
          </p>
        </div>

        <button
          onClick={handleReject}
          className="flex-shrink-0 p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors duration-200 cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
