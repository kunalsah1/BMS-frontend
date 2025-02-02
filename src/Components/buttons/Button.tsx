import React from "react";
import { Link } from "react-router-dom";

interface ButtonPropType {
  isLink?: boolean;
  href?: string;
  children?: React.ReactNode;
  bgColor?: string;
  isButton?: boolean;
  onClick?: () => void;
}

const Button = ({
  isLink,
  children,
  href,
  bgColor,
  isButton,
  onClick,
}: ButtonPropType) => {
  if (!isLink && !isButton) {
    console.warn(
      "Button component requires either isLink or isButton to be true."
    );
    return null;
  }
  return (
    <>
      {isLink ? (
        <Link
          to={href || ""}
          className={`flex justify-center items-center gap-2 px-3 py-1 font-semibold rounded-md   hover:text-gray-400 transition-all duration-300 ${bgColor}
          `}
        >
          {children}
        </Link>
      ) : isButton ? (
        <button
          onClick={onClick}
          className={`flex justify-center items-center gap-2 px-3 py-1 font-semibold rounded-md   hover:text-gray-400 transition-all duration-300 ${bgColor}
        `}
        >
          {children}
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default Button;
