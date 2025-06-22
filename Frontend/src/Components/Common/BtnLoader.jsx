import { useState } from "react";

function BtnLoader({ text, btnLoader }) {
  return (
    <>
      <button
        type="submit"
        disabled={btnLoader}
        className={`bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300 relative flex justify-center items-center ${
          btnLoader ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {btnLoader ? (
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
        ) : (
          text
        )}
      </button>
    </>
  );
}

export default BtnLoader;
