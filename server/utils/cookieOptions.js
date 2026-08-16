const isProd = process.env.NODE_ENV === "production";

// Set CROSS_SITE_COOKIES=true when the frontend and backend are deployed on
// different origins (e.g. separate Render services / a Static Site + a Web
// Service). Cross-site cookies require SameSite=None, which in turn requires
// Secure=true (browsers reject SameSite=None cookies sent without Secure).
const crossSite = process.env.CROSS_SITE_COOKIES === "true";

function accessTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd && crossSite ? "None" : "Lax",
    path: "/",
    maxAge: 60 * 60 * 1000, // 1 hour
  };
}

function refreshTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd && crossSite ? "None" : "Lax",
    path: "/api/refresh",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };
}

function clearAccessTokenCookieOptions() {
  const { maxAge, ...rest } = accessTokenCookieOptions();
  return rest;
}

function clearRefreshTokenCookieOptions() {
  const { maxAge, ...rest } = refreshTokenCookieOptions();
  return rest;
}

module.exports = {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  clearAccessTokenCookieOptions,
  clearRefreshTokenCookieOptions,
};
