import { useState } from "react";

function BtnLoader({ text, btnLoader, onClick }) {
  return (
    <>
      <button
        type="submit"
        disabled={btnLoader}
        onClick={onClick || (() => {})}
        className={`bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg w-full transition duration-300 relative flex justify-center items-center ${
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
