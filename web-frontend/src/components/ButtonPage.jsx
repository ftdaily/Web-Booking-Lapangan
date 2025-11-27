import React from "react";
import { Link } from "react-router-dom";

export const ButtonPage = ({ text, page }) => {
  return (
    <div className="mt-4">
      <Link to={page}>
        <button class="bg-red-600 font-semibold py-2 px-4 rounded hover:bg-red-700">
          {text}
        </button>
      </Link>
    </div>
  );
};
