import { useState } from "react";

function BtnLoader({ text, btnLoader, onClick }) {
  return (
    <>
      <button
        type="submit"
        disabled={btnLoader}
        onClick={onClick || (() => {})}
        className={`w-full bg-brand-700 hover:bg-brand-800 text-white rounded-full px-6 py-3 font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 relative flex justify-center items-center ${
          btnLoader ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {btnLoader ? (
          <div className="animate-spin rounded-full h-6 w-6 border-[3px] border-white border-t-transparent"></div>
        ) : (
          text
        )}
      </button>
    </>
  );
}

export default BtnLoader;
